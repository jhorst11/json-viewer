import { Element as TinyElement } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import { getType, isPrimitive, JsonObject, generateNodePreview, isNode, classNames } from './utils';

import styles from 'bundle-text:./styles.css';

const toggleNode = path => state => ({
    ...state,
    expanded: {
        ...state.expanded,
        [path]: !state.expanded[path]
    }
});

class JsonViewer extends TinyElement {
    data = null;
    state = {
        expanded: {}
    };

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: JsonObject
        };
    }

    handleKeyClick = path => e => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

    connectedCallback() {
        if (!this.hasAttribute('data')) {
            const json = this.innerText.trim();
            if (json) this.data = JSON.parse(json);
        }

        this.attachShadow({ mode: 'open' });

        super.connectedCallback();
    }

    renderObjectNode(data, path = '') {
        return html`
            <ul>
                ${Object.keys(data || {}).map(key => {
                    const nodeData = data[key];
                    const isPrimitiveOrNode = isPrimitive(nodeData) || isNode(nodeData);
                    const nodePath = path ? `${path}.${key}` : key;

                    return html`
                        <li>
                            ${this.renderObjectKey({
                                isCollapsable: !isPrimitiveOrNode,
                                collapsed: !this.state.expanded[nodePath],
                                key,
                                onClick: !isPrimitiveOrNode && this.handleKeyClick(nodePath)
                            })}
                            ${isPrimitiveOrNode ? this.renderValue(nodeData) : this.renderChild(nodeData, nodePath)}
                        </li>
                    `.withKey(key);
                })}
            </ul>
        `;
    }

    renderObjectKey({ isCollapsable, collapsed, onClick, key }) {
        return html`
            <span
                class=${classNames(key && 'key', isCollapsable && 'collapsable', collapsed && 'collapsableCollapsed')}
                onClick=${onClick}
            >
                ${key}:
            </span>
        `;
    }

    renderValue(node) {
        return isNode(node)
            ? node
            : html`
                  <span class=${getType(node)}>${JSON.stringify(node)}</span>
              `;
    }

    renderChild(node, path) {
        return !this.state.expanded[path]
            ? html`
                  <span class="preview">
                      ${generateNodePreview(node)}
                  </span>
              `
            : this.renderObjectNode(node, path);
    }

    render() {
        return html`
            <style>
                ${styles}
            </style>

            ${this.renderObjectNode(this.data)}
        `;
    }
}
customElements.define(JsonViewer.is, JsonViewer);
