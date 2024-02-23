import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker'

import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);
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
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                fetch(
                    "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
                    {
                        method: "POST",
                        body: formData
                    }
                )
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        resolve(result.data.url);
                    })
                    .catch((error) => {
                        reject("Upload failed");
                        console.error("Error:", error);
                    });
            });
        }
    },
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

const Test = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [content, setContent] = useState()


    const handleChange = (html) => {
        setContent(html)
    }

    console.log("binh_content", content)
    return (
        <PageContainerBroker
            titleId={"Thay đổi mật khẩu"}
        >
            <div className="profile">
                <div className="profile-container">
                    <div>
                        <ReactQuill
                            theme={"snow"}
                            onChange={handleChange}
                            value={content}
                            modules={modules}
                            formats={formats}
                            bounds={'.app'}
                            placeholder={"abc"}
                        />
                        <div className="themeSwitcher">
                            <label>Theme </label>
                            {/* <select onChange={(e) =>
                                this.handleThemeChange(e.target.value)}>
                                <option value="snow">Snow</option>
                                <option value="bubble">Bubble</option>
                                <option value="core">Core</option>
                            </select> */}
                        </div>
                    </div>
                    <div className="" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
        </PageContainerBroker>
    )
}

export default Test