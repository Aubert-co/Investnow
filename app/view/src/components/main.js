import React from "react";
import AssetsList from "./assetslist";
import Balance from "./balance";
import ChartAssets from "./chartAssets";
import { services } from "../service";
import { MainStyle } from "../styles/MainStyle";

const {ServiceAssets,ServiceAssetsVariation,ServiceUserAssets,ServiceAssetsRecommended}=services


export default function Main(){

    return (
        <MainStyle>
            
            <Balance/>
            <div className="chart">
                <ChartAssets/>
            </div>

            <div className="assets">
              <h2>Recommendations based on your profile</h2>
              <AssetsList service={ServiceAssetsRecommended()}/>
            </div>

            <div className="assets">
                <h2>TOP GAIN</h2>
                <AssetsList  service={ServiceAssetsVariation("DESC",1)} />
            </div>
            <div className="assets">
              <h2>Most searched assets</h2>
                <AssetsList  service={ServiceAssets()} />
            </div>
        </MainStyle>
    )
}

