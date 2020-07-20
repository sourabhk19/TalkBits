import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [tweets,setTweets]=useState([{content: 143}])
  useEffect(()=>{
    //do lookup
    const TweetItems=[{"content" : 123},{"content" :" yo yo"}]
    setTweets(TweetItems)
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {tweets.map((tweet,index)=>{
            return <li>{tweet.content}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
