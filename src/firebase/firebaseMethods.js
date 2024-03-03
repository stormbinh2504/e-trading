import { appFirebase, auth, dbFirestore } from './firebaseconfig'
import firebase from "firebase/compat/app";
import { reduxStore, dispatch } from '../redux/store';
import { getAuth, signOut, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    setDoc,
} from "firebase/firestore";

export const firebaseMethods = {
    // firebase helper methods go here... 
    signup: async (body) => {
        const { email, password } = body
        await createUserWithEmailAndPassword(getAuth(appFirebase), email, password)
            //make res asynchonous so that we can make grab the token before saving it.
            .then(async res => {
                // {
                //     "kind": "identitytoolkit#SignupNewUserResponse",
                //     "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiYjg3ZGNhM2JjYjY5ZDcyYjZjYmExYjU5YjMzY2M1MjI5N2NhOGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS10cmFkaW5nLTYxNDNlIiwiYXVkIjoiZS10cmFkaW5nLTYxNDNlIiwiYXV0aF90aW1lIjoxNzA5MzcyNzQ1LCJ1c2VyX2lkIjoiYnhCSkhDSjcxMWcyMW54b0lKeGF1WnJPOUplMiIsInN1YiI6ImJ4QkpIQ0o3MTFnMjFueG9JSnhhdVpyTzlKZTIiLCJpYXQiOjE3MDkzNzI3NDUsImV4cCI6MTcwOTM3NjM0NSwiZW1haWwiOiJkb25hbWtoYW5oQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkb25hbWtoYW5oQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.jjw_wL42nWj2ebSbRknRjgandPDzXVJP2WJNn3NTv2vyTmf1pfsir2vsti4c2N71NdFAONhIG_J4PMZ08qrx8cEr0Ec26Gr0NcVtH3mCwK7ayGTzh2AmjAPirBMe_yatzC9CFKeUo3begJB_wBzrpPavcthj2r4a3jcH8IDohsd6A0D10goxAZI1_mDfIDPaciY7FNrv9z8riwSExmv6FGc2z7HDzUMM7awghf6iqQIA2Zp_BVRuEc4gu3X94NWsozaLlQ79EoyOgU8Kp8w7nTyO-zdJVKroa5qDl8WRLrwsOWDMt_XJyseUHFpc0dUezkpwO-kAdqLYfLUEeaSU1A",
                //     "email": "donamkhanh@gmail.com",
                //     "refreshToken": "AMf-vBwuB3ic15HEViHc1kyzu_oEHzLzy-RdkbvZz7zKWdylR-X3K5Wmq4rK9qelho6eEjajcevUPjxUFi0lGrlgk2b1g8u-fg1yvY46vP6Q4fR5AUQxJKffuzRErLMx-IPmenrstv26MunpCno0rgcdQ67T0EqnN15Sj2-HU-ny_VbIQ_cYEy9sE2zOZcxCEZvGre2E7I_kRxN3cQejWrA1dorFCNpgxw",
                //     "expiresIn": "3600",
                //     "localId": "bxBJHCJ711g21nxoIJxauZrO9Je2"
                //   }
                return res && res.user
            })
            .catch(err => {
                console.log("err", err)
                // setErrors(prev => ([...prev, err.message]))
            })
    },
    login: async (body) => {
        const { email, password } = body;
        try {
            const res = await signInWithEmailAndPassword(getAuth(appFirebase), email, password);
            console.log("firebaseMethods_login_1", res);
            return res.user; // Trả về user object từ phản hồi
        } catch (err) {
            throw err; // Ném lỗi để bắt ở phần gọi hàm login
        }
    },
    //no need for email and password
    logout: async () => {
        // signOut is a no argument function
        await signOut(getAuth(appFirebase))
            .then(res => {
                //remove the token
                //set the token back to original state
            })
            .catch(err => {

            })
    },
    deleteAccount: async (email) => {
        try {
            const user = await fetchSignInMethodsForEmail(getAuth(appFirebase), email);

            // Kiểm tra xem người dùng có tồn tại không trước khi xóa
            if (user) {
                // Xóa người dùng khỏi Firebase Authentication
                console.log("deleteAccount", user, auth)
                await deleteUser(getAuth(appFirebase), user.uid);
                console.log('User deleted successfully.');
            } else {
                console.log('User does not exist.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
    uploadProfileImage: (imageBytes64Str) => {
        // const bucket = admin.storage().bucket()
        // const imageBuffer = Buffer.from(imageBytes64Str, 'base64')
        // const imageByteArray = new Uint8Array(imageBuffer);
        // const file = bucket.file(`images/profile_photo.png`);
        // const options = { resumable: false, metadata: { contentType: "image/jpg" } }

        // //options may not be necessary
        // return file.save(imageByteArray, options)
        //     .then(stuff => {
        //         return file.getSignedUrl({
        //             action: 'read',
        //             expires: '03-09-2500'
        //         })
        //     })
        //     .then(urls => {
        //         const url = urls[0];
        //         console.log(`Image url = ${url}`)
        //         return url
        //     })
        //     .catch(err => {
        //         console.log(`Unable to upload image ${err}`)
        //     })
    },
    setDataToFirebase: async (key, path, data) => {
        console.log("setDataToFirebase", key, path, data)
        if (!key) {
            return
        }
        try {
            await setDoc(doc(dbFirestore, path, key), data);
        } catch (err) {
            console.error(err);
        }
    },
    getDatafromFirebase: async (key, path) => {
        const myCollection = collection(dbFirestore, path);
        console.log("getDatafromFirebase", key, path)
        try {
            const querySnapshot = await getDocs(myCollection);
            let data = {}
            querySnapshot.forEach((doc) => {
                // data = doc.data()
                data[doc.id] = doc.data();
            });
            return (data && data[key]) || {}
            // return querySnapshot
        } catch (err) {
            console.error(err);
        }
    },
}