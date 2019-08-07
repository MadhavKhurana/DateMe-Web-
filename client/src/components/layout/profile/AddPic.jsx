import React, { Component } from "react";

class AddPic extends Component {
  state = {
    file: null,
    imgSrc: null
  };
  SubmitPic = () => {};
  onChange = e => {
    let files = e.target.files;
    this.setState({
      file: files[0]
    });
    let reader = new FileReader();
    let url = reader.readAsDataURL(files[0]);

    reader.onloadend = e => {
      this.setState({
        imgSrc: [reader.result]
      });
    };
  };
  render() {
    return (
      <div className="container col-md-3">
        <form onSubmit={this.SubmitPic}>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              onChange={this.onChange}
              id="customFile"
            />
            <img className="img-fluid" src={this.state.imgSrc} />
            <label class="custom-file-label" for="customFile">
              Add a Pic
            </label>
          </div>
          <input type="submit" className="btn btn-primary" value="Upload" />
        </form>
      </div>
    );
  }
}

export default AddPic;
