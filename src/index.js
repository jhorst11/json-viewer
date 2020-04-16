import { Element as TinyElement } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import { getType, isPrimitive, JsonObject, generateNodePreview, isNode, classNames } from './utils';

const ObjectKey = ({ isCollapsable, collapsed, onClick, key }) => html`
    <span
        class=${classNames(key && 'key', isCollapsable && 'collapsable', collapsed && 'collapsableCollapsed')}
        onClick=${onClick}
    >
        ${key}:
    </span>
`;

class JsonNestedObjectNode extends TinyElement {
    data = null;
    collapsed = true;

    static get properties() {
        return {
            data: JsonObject,
            collapsed: Boolean,
            key: String,
            link: Boolean
        };
    }

    static get is() {
        return 'json-nested-object-node';
    }

    handleKeyClick = e => {
        e.preventDefault();
        this.collapsed = !this.collapsed;
    };

    handleLinkClick = e => {
        if (this.link) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('linkClick', { detail: this.data, bubbles: true, composed: true }));
        }
    };

    renderValue(node) {
        return isNode(node)
            ? html`
                  <div>${node}</div>
              `
            : html`
                  <span class=${getType(node)}
                      ><span class=${this.link ? 'link' : ''} onClick=${this.handleLinkClick}
                          >${JSON.stringify(node)}</span
                      ></span
                  >
              `;
    }

    renderChild(node, onPreviewClick) {
        return this.collapsed
            ? html`
                  <span class="preview" onClick=${onPreviewClick}>
                      ${generateNodePreview(node)}
                  </span>
              `
            : html`
                  <json-object-node data=${node}></json-object-node>
              `;
    }

    render() {
        const { data, key } = this;
        const isPrimitiveOrNode = isPrimitive(data) || isNode(data);

        return html`
            ${ObjectKey({
                isCollapsable: !isPrimitiveOrNode,
                collapsed: this.collapsed,
                key,
                onClick: !isPrimitiveOrNode && this.handleKeyClick
            })}
            ${isPrimitiveOrNode ? this.renderValue(data) : this.renderChild(data, this.handleKeyClick)}
        `;
    }
}

class JsonObjectNode extends TinyElement {
    data = null;
    collapsed = true;

    static get is() {
        return 'json-object-node';
    }

    static get properties() {
        return {
            data: JsonObject,
            collapsed: Boolean
        };
    }

    renderObject(data) {
        return Object.keys(data).map(key => {
            return html`
                <li>
                    <json-nested-object-node
                        key=${key}
                        link=${key === '__ref'}
                        data=${data[key]}
                    ></json-nested-object-node>
                </li>
            `.withKey(key);
        });
    }

    renderPrimitive(data) {
        return data !== undefined
            ? html`
                  <li>${data}</li>
              `
            : null;
    }

    render() {
        const { data } = this;

        return html`
            <ul>
                ${isPrimitive(data) ? this.renderPrimitive(data) : this.renderObject(data)}
            </ul>
        `;
    }
}

class JsonViewer extends TinyElement {
    data = null;

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: JsonObject
        };
    }

    connectedCallback() {
        if (!this.hasAttribute('data')) {
            const json = this.innerText.trim();
            if (json) this.data = JSON.parse(json);
        }

        this.attachShadow({ mode: 'open' });

        super.connectedCallback();
    }

    render() {
        return html`
            <style>
                :host {
                    --color: #f8f8f2;
                    --color-link: #006dcc;
                    --color-link-hover: #005fb2;
                    --string-color: #a3eea0;
                    --number-color: #d19a66;
                    --boolean-color: #4ba7ef;
                    --null-color: #df9cf3;
                    --property-color: #6fb3d2;
                    --font-family: monaco, Consolas, 'Lucida Console', monospace;
                    --preview-color: rgba(222, 175, 143, 0.9);

                    display: block;
                    background-color: var(--background-color);
                    color: var(--color);
                    font-family: var(--font-family);
                    font-size: 1rem;
                }

                .preview {
                    color: var(--preview-color);
                    cursor: pointer;
                }

                .null {
                    color: var(--null-color, #df9cf3);
                }

                .key {
                    color: var(--property-color, #f9857b);
                    display: inline-block;
                }

                .collapsable:before {
                    display: inline-block;
                    color: var(--color);
                    padding-right: 5px;
                    padding-left: 5px;
                    font-size: 0.7rem;
                    content: '▶';
                    transition: transform 195ms ease-in;
                    transform: rotate(90deg);
                    color: var(--property-color);
                }

                .collapsable.collapsableCollapsed:before {
                    transform: rotate(0);
                }

                .collapsable {
                    cursor: pointer;
                    user-select: none;
                }

                .link {
                    color: var(--color-link);
                    cursor: pointer;
                }

                .link:hover {
                    color: var(--color-link-hover);
                }

                .string {
                    color: var(--string-color);
                }

                .number {
                    color: var(--number-color);
                }

                .boolean {
                    color: var(--boolean-color);
                }

                ul {
                    padding: 0;
                    clear: both;
                }

                ul,
                li {
                    list-style: none;
                    position: relative;
                }

                li ul > li {
                    position: relative;
                    padding-top: 0.25rem;
                    margin-left: 1.5rem;
                    padding-left: 0px;
                }

                json-nested-object-node ul:before {
                    content: '';
                    border-left: 1px solid #333;
                    position: absolute;
                    left: 0.5rem;
                    top: 0.5rem;
                    bottom: 0.5rem;
                }

                json-nested-object-node ul:hover:before {
                    border-left: 1px solid #666;
                }
            </style>
            <json-object-node data=${this.data}></json-object-node>
        `;
    }
}
customElements.define(JsonObjectNode.is, JsonObjectNode);
customElements.define(JsonNestedObjectNode.is, JsonNestedObjectNode);
customElements.define(JsonViewer.is, JsonViewer);
