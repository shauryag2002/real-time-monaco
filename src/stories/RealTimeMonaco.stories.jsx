// import React from "react";
// import { storiesOf } from "@storybook/react";
// import { RealTimeMonaco } from "../components/RealTimeMonaco";
// const stories = storiesOf("App Test", module);
// stories.add("RealTimeMonaco", () => <RealTimeMonaco />);
import React from 'react';
import { RealTimeMonaco } from '../components/RealTimeMonaco';

export default {
    title: 'App Test/RealTimeMonaco',
    component: RealTimeMonaco,
};
const Template = (args) =>
(

    <RealTimeMonaco  {...args} />
)
const generateRandomName = () => {
    return Math.random().toString(36).substring(7);
}
const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
export const Default = Template.bind({

});
Default.args = {
    height: "500px",
    width: "500px",
    name: generateRandomName(),
    color: generateColor(),
    roomId: "12",
};