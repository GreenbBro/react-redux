import React, {Component} from 'react'
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js'
import {stateFromHTML} from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html'
import '../styles/rich-editor.css'

export default class MyEditor extends Component {

    constructor(props) {
        super(props)
        const text = this.props.text
        let contentState = stateFromHTML(text)
        console.log(ContentState)
        //this.state = {editorState: EditorState.createWithContent(ContentState.createFromText(text))}
        this.state = {editorState: EditorState.createWithContent(contentState)}
        this.focus = () => this.refs.editor.focus()
        this.onTab = (e) => this._onTab(e)
        this.toggleBlockType = (type) => this._toggleBlockType(type)
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
        this.onChange = (editorState) => {
            this.setState({editorState})
        }
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _onTab(e) {
        const maxDepth = 4
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        )
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        )
    }

    _onTestClick(text) {
        console.log('sdcsdss', text, this.state);
    }

    render() {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        let className = 'RichEditor-editor'
        let htmlOutput = stateToHTML(contentState)
        /*this.setState({
            html: htmlOutput
        })*/
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'
            }
        }

        return <div className='RichEditor-root'>
                <div className='editor-toolbar'>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                </div>
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        ref='editor'
                        spellcheck={true}
                        />
                        <button onClick={this._onTestClick(htmlOutput)}>test</button>
                </div>
            </div>
    }
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 16,
        padding: 2
    }
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote'
        default: return null
    }
}

class StyleButton extends React.Component {
    constructor() {
        super()
        this.onToggle = (e) => {
            e.preventDefault()
            this.props.onToggle(this.props.style)
        }
    }

    render() {
        let className = 'RichEditor-styleButton'
        if (this.props.active) {
            className += ' RichEditor-activeButton'
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
            )
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'}
]

const BlockStyleControls = (props) => {
    const {editorState} = props
    const selection = editorState.getSelection()
    const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

    return (
        <div className='RichEditor-controls'>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    />
            )}
        </div>
    )
}

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'}
]

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className='RichEditor-controls'>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    />
            )}
            </div>
    )
}