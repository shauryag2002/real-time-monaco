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

export const Default = Template.bind({

});
Default.args = {};