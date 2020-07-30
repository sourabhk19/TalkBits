import React,{useState,useEffect} from 'react'
import {apiTweetCreate,apiTweetList, apiTweetAction} from './lookup'

export function TweetsComponent(props){
  const textAreaRef = React.createRef()
  const [newTweets,setNewTweets]=useState([])
  const handleBackendUpdate = (response, status) =>{
    // backend api response handler
    let tempNewTweets = [...newTweets]
    if (status === 201){
      tempNewTweets.unshift(response)
      setNewTweets(tempNewTweets)
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
    return <div className={props.className}>
            <div className='col-12 mb-3'>
              <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
            </div>
        <TweetList newTweets={newTweets} />
    </div>
}

export function TweetList(props){
    const [tweetsDidSet,settweetsDidSet]=useState(false)
    const [tweetsInit,setTweetsInit]=useState([])
    const [tweets,setTweets]=useState([])
    //setTweetsInit([...props.newTweets].concat(tweetsInit))
    useEffect(()=>{
      let final=[...props.newTweets].concat(tweetsInit)
      if(final.length !== tweets.length )
      {
        setTweets(final)
      }
    },[props.newTweets,tweets,tweetsInit])
    
    useEffect(()=>{
      if(tweetsDidSet===false){
        const handleTweetListLookup=(response,status)=>{
          console.log(response,status)
          //const TweetItems=[{"content" : 123},{"content" :" yo yo"}]
          if(status===200){
          setTweetsInit(response)
          settweetsDidSet(true)
          }
          else{
            alert("There was an error")
          }
        }
        apiTweetList(handleTweetListLookup)
        //do lookup
      }
     
    },[tweetsInit,settweetsDidSet,tweetsDidSet])
    return tweets.map((item, index)=>{
      return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`} />
    })
  }

  export function ActionBtn(props) {
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    //const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const handleActionBackendEvent=(response,status) =>{
      console.log(status,response)
      if(status===200)
      {
        setLikes(response.likes)
        //setUserLike(true)
      }
    
      //if (action.type === 'like') {
      //  if (userLike === true) {
      //    // perhaps i Unlike it?
      //    setLikes(likes - 1)
      //    setUserLike(false)
      //  } else {
      //    setLikes(likes + 1)
      //    setUserLike(true)
      //  }
        
      //}
    
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id,action.type,handleActionBackendEvent)
      
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
  }
  
 export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{tweet.id} - {tweet.content}</p>
        <div className='btn btn-group'>
          <ActionBtn tweet={tweet} action={{type: "like", display:"Likes"}}/>
          <ActionBtn tweet={tweet} action={{type: "unlike", display:"Unlike"}}/>
          <ActionBtn tweet={tweet} action={{type: "retweet", display:""}}/>
        </div>
    </div>
  }
  
  