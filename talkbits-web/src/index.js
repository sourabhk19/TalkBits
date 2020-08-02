import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TweetsComponent,TweetDetailComponent} from './tweets'
import * as serviceWorker from './serviceWorker';

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
const e=React.createElement
const tweetsEl = document.getElementById("talkbits")
if (tweetsEl) {

    ReactDOM.render(e(TweetsComponent,tweetsEl.dataset) , tweetsEl);
}

const tweetDetailElements=document.querySelectorAll(".talkbits-detail")

tweetDetailElements.forEach(container=> {
    ReactDOM.render(
        e(TweetDetailComponent, container.dataset), 
        container);
})

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
