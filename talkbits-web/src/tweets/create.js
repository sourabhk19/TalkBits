import React  from 'react'

import {
  apiTweetCreate} from './lookup'

//import {ActionBtn} from './buttons'
//import {TweetsList} from './list'

export function TweetCreate(props){
  const textAreaRef = React.createRef()
  const {didTweet} =props
    //const [newTweets, setNewTweets] = useState([])
    
    //const canTweet=props.canTweet==="false"?false:true
    const handleBackendUpdate = (response, status) =>{
      // backend api response handler
      //let tempNewTweets = [...newTweets]
      if (status === 201){
        //tempNewTweets.unshift(response)
        didTweet(response)
      } else {
        console.log(response)
        alert("An error occured please try again")
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const newVal = textAreaRef.current.value
      // backend api request
      apiTweetCreate(newVal, handleBackendUpdate)
      textAreaRef.current.value = ''
    }
    return  <div className={props.className}>
              <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
            </div>

}