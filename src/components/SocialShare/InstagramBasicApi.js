// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstagramBasicApi = ({ mediaData }) => {
    console.log(mediaData)
  return (
    <div>
      <h3>Instagram Media</h3>
      <ul>
        {mediaData && mediaData.map((media) => (
          <li key={media.id}>
            <img src={media.media_url} alt={media.caption} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const accessToken = 'IGQWRNU1ZAZAYVllZA0pvdEg0cnBIX0thZA3ozTThEdEZAGbG5yRWhTZAHRBTG9vamRKR29nZAmtWVEVJLWlSc1k4eWw0QTBYR3B4NHVyU0h0ZAExyNzBjeUVNUWdpRXhpLVJKTE5yQ1lCOEpObmJCb2xjYXFlZAXFKSXpmUTgZD';
    const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`;

    const response = await axios.get(apiUrl);
    const mediaData = response.data;
    console.log("mediaData", mediaData)
    return {
      props: { mediaData }, 
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: { mediaData: [] },
    };
  }
}

export default InstagramBasicApi;
