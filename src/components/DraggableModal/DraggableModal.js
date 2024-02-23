import React, { Component } from 'react';
import { Modal } from 'reactstrap';

import { KeyCodeUtils } from "../../utils";
import JSXUtils from '../../utils/JsxUtils';
import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';

import "./DraggableModal.scss"

class DraggableModal extends Component {
    constructor(props) {
        super(props);
        this.draggableWrapper = React.createRef();
    };

    componentDidUpdate(prevProps) {
        const { isOpen } = this.props;
        if (prevProps.isOpen !== isOpen && isOpen === true) {
            this.draggableWrapper && this.draggableWrapper.current && this.draggableWrapper.current.resetPosition();
        }
        if (isOpen === true) {
            document.addEventListener('keydown', this.handlerKeyDown);
        } else {
            document.removeEventListener('keydown', this.handlerKeyDown);
        }

    };

    checkboundUpper = () => {
        this.draggableWrapper && this.draggableWrapper.current && this.draggableWrapper.current.checkboundUpper();
    }

    handlerKeyDown = (event) => {
        const { toggle, onEnter } = this.props;
        const keyCode = event.which || event.keyCode;
        switch (keyCode) {
            case KeyCodeUtils.ESCAPE:
                event.preventDefault();
                toggle();
                break;
            case KeyCodeUtils.ENTER:
                event.preventDefault();
                if (onEnter) {
                    onEnter();
                }
                break;
            default:
                break;
        }
    };


    render() {
        const { isOpen, toggle, onClose, className, headerClass, hideClose } = this.props;
        const { titleId } = this.props;

        let headerContainerClass = headerClass ? JSXUtils.joinClass("dragHandler", headerClass) : JSXUtils.joinClass("dragHandler", "header-dragHandler");
        let containerClass = JSXUtils.joinClass(className, 'draggable-modal');
        let showClose = true
        if (hideClose) {
            showClose = false
        }
        return (
            <DraggableWrapper
                ref={this.draggableWrapper}
                dragClass=".dragHandler"
                wrapperClass="modal-content"
            >
                <Modal
                    backdrop={"static"}
                    keyboard={false}
                    isOpen={isOpen}
                    toggle={this.toggle}
                    className={containerClass}
                    centered={true}
                    autoFocus={false}
                    fade={false}
                >
                    <div className={headerContainerClass}>
                        <div className="title-modal txt---700-14-20">
                            {titleId}
                        </div>
                        {showClose && <div className="btn-icon-fm" onClick={onClose}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>}
                    </div>
                    <div className="body-dragHandler">
                        {this.props.children}
                    </div>
                </Modal >
            </DraggableWrapper >
        )
    };
};

export default DraggableModal;