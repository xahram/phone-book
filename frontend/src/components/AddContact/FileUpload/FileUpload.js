import React from 'react';
import Image from './Image/Image'
export default class FileUPload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null }
        this.img = React.createRef();
    }
    onFileHandler = async (e) => {
        const imageTypes = ["jpeg", "jpg", "png"]
        this.setState({ file: e.target.files[0] }, () => {
            console.log(this.state.file)
            const reader = new FileReader();
            reader.readAsDataURL(this.state.file);
            reader.onload = async (event) => {
                this.img.current.src = event.target.result;
            }
            const imgType = this.state.file.type.split("/")[1]
            const imgSize = this.state.file.size / 1000
            console.log(imgSize, imgType)
            if (!imageTypes.includes(imgType) || imgSize > 200) {
                this.props.checkFilehandler(false)
            }
            else {
                this.props.checkFilehandler(true)
            }
        })

        // console.log(e.target.files[0])

    }
    render() {
        return (
            <div>
                <Image ref={this.img} />
                <input type="file" onChange={this.onFileHandler} />
                <p>{!this.props.valid ? "Please Upload File oF JPEG,JPG,PNG with size less than 200kb" : ""}</p>
            </div>
        )
    }
}