import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ChannelCard, Videos } from "./";

const ChannelDetail = () => {
  let [channelDetail, setChannelDetail] = useState();
  let [videos, setVideos] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
    console.log(channelDetail);
  }, [id]);

  return (
    <Box minHeight="95vh">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
          height: "300px",
          zIndex: 10,
        }}
      />
      <ChannelCard
        channelDetail={channelDetail}
        marginTop="-110px"
      ></ChannelCard>

      <Box display="flex" p="2" justifyContent="center">
        {/* <Box sx={{ mr: { sm: "100px" } }} /> */}
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
