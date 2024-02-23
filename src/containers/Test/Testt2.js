import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Test.scss"

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

let a = ""
const Test2 = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [content, setContent] = useState()

    return (
        <PageContainerBroker
            titleId={"Thay đổi mật khẩu"}
        >
            <div className="profile">
                <div className="profile-container">
                    <div className="" dangerouslySetInnerHTML={{ __html: a }}></div>
                </div>
            </div>
        </PageContainerBroker>
    )
}
export default Test2