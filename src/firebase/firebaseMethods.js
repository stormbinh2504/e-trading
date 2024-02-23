import firebaseconfig from './firebaseIndex'
import firebase from "firebase/compat/app";

export const firebaseMethods = {
    // firebase helper methods go here... 
    signup: (email, password, setErrors, setToken) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            //make res asynchonous so that we can make grab the token before saving it.
            .then(async res => {
                const token = await Object.entries(res.user)[0][1].accessToken
                // const token = await Object.entries(res.user)[5][1].b
                //set token to localStorage 
                await localStorage.setItem('token', token)
                setToken(token)
                //grab token from local storage and set to state. 
                console.log(res)
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
            })
    },
    signin: (email, password, setErrors, setToken) => {
        //change from create users to...
        firebase.auth().signInWithEmailAndPassword(email, password)
            //everything is almost exactly the same as the function above
            .then(async res => {
                const token = await Object.entries(res.user)[0][1].accessToken
                // const token = await Object.entries(res.user)[5][1].b

                //set token to localStorage 
                await localStorage.setItem('token', token)

                setToken(window.localStorage.token)
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
            })
    },
    //no need for email and password
    signout: (setErrors, setToken) => {
        // signOut is a no argument function
        firebase.auth().signOut().then(res => {
            //remove the token
            localStorage.removeItem('token')
            //set the token back to original state
            setToken(null)
        })
            .catch(err => {
                //there shouldn't every be an error from firebase but just in case
                setErrors(prev => ([...prev, err.message]))
                //whether firebase does the trick or not i want my user to do there thing.
                localStorage.removeItem('token')
                setToken(null)
                console.error(err.message)
            })
    },
    uploadProfileImage: (imageBytes64Str) => {
        const bucket = admin.storage().bucket()
        const imageBuffer = Buffer.from(imageBytes64Str, 'base64')
        const imageByteArray = new Uint8Array(imageBuffer);
        const file = bucket.file(`images/profile_photo.png`);
        const options = { resumable: false, metadata: { contentType: "image/jpg" } }

        //options may not be necessary
        return file.save(imageByteArray, options)
            .then(stuff => {
                return file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2500'
                })
            })
            .then(urls => {
                const url = urls[0];
                console.log(`Image url = ${url}`)
                return url
            })
            .catch(err => {
                console.log(`Unable to upload image ${err}`)
            })
    }
}