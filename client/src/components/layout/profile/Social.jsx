import React from 'react'
import InputGroup from './InputGroup.jsx'

class Social extends React.Component{
    state={
        errors:{}
    }
    render(){
            const {errors}=this.state

        return(
            <div><br/>
              <h4>Add your social links (Optional)</h4>
               <form>
                <InputGroup
                        placeholder="Twitter profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        
                    />
                    <InputGroup
                        placeholder="Facebook page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    </form>
            </div>
        )
    }
}

export default Social;