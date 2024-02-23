import imageCompression from 'browser-image-compression';
export const checkImage = (file) => {
    let err = ""
    if (!file) return err = "File does not exist."

    if (file.size > 1024 * 1024) // 1mb
        err = "The largest image size is 1mb."

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image format is incorrect."

    return err;
}


export const imageUpload = async (images) => {
    // let imgArr = [];
    // for (const item of images) {
    //     const formData = new FormData()

    //     if (item.camera) {
    //         formData.append("file", item.camera)
    //     } else {
    //         formData.append("file", item)
    //     }

    //     formData.append("upload_preset", "efxjficn")
    //     formData.append("cloud_name", "devat-channel")

    //     const res = await fetch("https://api.cloudinary.com/v1_1/devat-channel/upload", {
    //         method: "POST",
    //         body: formData
    //     })

    //     const data = await res.json()
    //     imgArr.push({ public_id: data.public_id, url: data.secure_url })
    // }
    // return imgArr;

    const formData = new FormData()
    formData.append("file", images)
    formData.append("upload_preset", "binhhuun")
    formData.append("cloud_name", "stormbinh2504")
    const res = await fetch("https://api.cloudinary.com/v1_1/stormbinh2504/upload", {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    let urlImage = await data.secure_url

    // const formData = new FormData()
    // formData.append("file", images)
    // formData.append("upload_preset", "binhhuun")
    // formData.append("cloud_name", "stormbinh2504")
    // const res = await fetch("https://api.cloudinary.com/v1_1/stormbinh2504/upload", {
    //     method: "POST",
    //     body: formData
    // })
    // const urlImage = await res.json().secure_url

    return urlImage
}

const options = {
    maxSizeMB: 1,            // (default: Number.POSITIVE_INFINITY)      // optional, fileType override e.g., 'image/jpeg', 'image/png' (default: file.type)
    initialQuality: 0.7,       // optional, initial quality value between 0 and 1 (default: 1)
    alwaysKeepResolution: true // optional, only reduce quality, always keep width and height (default: false)
}


export const compressImage = async (file)=> {
    let imageOptimize
    await imageCompression(file, { ...options, fileType: (file && file.type) ? file.type : 'image/png' })
        .then((res) => {
            imageOptimize = res
        })
        .catch((error) => {

            alert('Error while compress image', error)
        })
    return imageOptimize
}