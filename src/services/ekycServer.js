
import _ from 'lodash';
import axios2 from '../axios2'

const ekycServer = {

    // Upload ảnh
    addFileServerEkyc(data) {
        let url = `ekyc/uploadToServer`;
        let form = new FormData();
        form.append('file', data.file);
        // form.append('title', data.title ? data.title : '',);
        // form.append('description', data.description ? data.description : '')
        return axios2.post(url, form);
    },

    // compare 2 mặt
    compare2Faces(data) {
        let url = `ekyc/compareFace`;
        let body = {
            img_front: data && data.image_hash_front,
            img_face: data && data.image_hash_face,
            client_session: data.client_session,
            token: 'token'
        }
        return axios2.post(url, body);
    },

}

export default ekycServer;