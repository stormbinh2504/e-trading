import { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject
} from "firebase/storage";
import { storage } from "../firebase/firebaseconfig";
import { v4 } from "uuid";

import firebase from 'firebase/app';

export const useOnClickOutside = (ref, handleClick) => {
    useEffect(() => {
        const listener = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClick(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handleClick]);
};



export const uploadImgToFireBase = async (srcImg, imageUpload, setUrl) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${srcImg}/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload)
        .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    console.log("uploadImgToFireBase", url)
                    setUrl && setUrl(url)
                });
        })
        .catch((error) => {
            alert(error)
        })
};


export const uploadImgToFireBaseQuill = async (srcImg, imageUpload, setUrl) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${srcImg}/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload)
        .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref)
                .then(async (url) => {
                    console.log("uploadImgToFireBase", url)
                    setUrl && setUrl(url)
                });
        })
        .catch((error) => {
            alert(error)
        })
};

export const deleteFromFirebase = async (urlOld, urlCur, setImgCur) => {
    if (urlOld) {
        const imageRef = ref(storage, urlOld);
        deleteObject(imageRef).then(() => {
            console.log("deleteFromFirebase", urlOld)
            urlCur && setImgCur && setImgCur(urlCur)
        }).catch((error) => {
            console.log(error);
        });
    }
};
