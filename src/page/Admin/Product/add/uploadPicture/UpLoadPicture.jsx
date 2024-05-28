import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

import axios from 'axios';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const App = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [NameList, setNameList] = useState([])

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const getAuthToken = () => {
        return window.localStorage.getItem("auth-token")
    }


    const [progress, setProgress] = useState(0);

    const uploadImage = async options => {
        // let temp = NameList;
        const { onSuccess, onError, file, onProgress } = options;


        const fmData = new FormData();
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": 'Bearer ' + getAuthToken()
            },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("image", file);
        // console.log(file)
        // console.log(fmData)
        // console.log("1:", fileList)
        setFileList((oldFileList) => [...oldFileList, file]);
        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/file/add",
                fmData
                ,
                config
            );

            onSuccess("Ok");
            let data = {
                uid: file.uid,
                name: res.data
            }
            // console.log(file)

            const newfile = file
            newfile.url = "http://localhost:8080/images/" + res.data
            // setNameList((oldNameList) => [...oldNameList, data])
            setFileList((oldFileList) =>
                oldFileList.map((oldFile) =>
                    oldFile === file ? newfile : oldFile,
                ),
            );

            // console.log("Con:", NameList)
            props.handleChangeImages([...props.images, data])
            // console.log(fileList)

            // temp.push(data)
            // setNameList(temp)
            // console.log("2:", fileList)
            // file.name = res.data
            // console.log(file)
            // console.log("server res: ", res);

        } catch (err) {
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const handleRemove = (file) => {
        const imageclone = [...props.images].filter((item) => item.uid !== file.uid);
        props.handleChangeImages(imageclone);
        setFileList(fileList.filter((item) => item.uid !== file.uid))
        // setNameList(NameList.filter((item) => item.uid !== file.uid))
        // props.handleChangeImages(NameList)
    }


    return (
        <>
            <Upload
                customRequest={uploadImage}
                listType="picture-card"
                fileList={fileList}
                onRemove={handleRemove}
                onPreview={handlePreview}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
export default App;