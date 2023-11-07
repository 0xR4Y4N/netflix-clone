import React from 'react'
import Main from '../component/Main'
import Row from '../component/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <div>
        <Main/>
        <Row title="Up Coming" rowID={1} fetchURL={requests.requestUpcoming}/>
        <Row title="Popular" rowID={2} fetchURL={requests.requestPopular}/>
        <Row title="Trending" rowID={3} fetchURL={requests.requestTrending}/>
        <Row title="Top Rated" rowID={4} fetchURL={requests.requestTopRated}/>
        <Row title="Horror" rowID={5} fetchURL={requests.requestHorror}/>
    </div>
  )
}

export default Home