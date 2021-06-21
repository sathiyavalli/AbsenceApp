import * as enzyme from 'enzyme';
import * as React from 'react';
import App from './App';
import Absences from './subcomponents/absenceData';
import AbsenceList from './AbsenceList';
import Enzyme, { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";

describe("rendering components", () => {

    it("renders App component header without crashing", () => {
        const wrapper = shallow( < App / > );        
    });
    it("renders absence component without crashing", () => {
        const wrapper = shallow( < Absences/> );
    });

    it("renders Absences component without crashing", () => {
        shallow( < AbsenceList/> );
    });
});
describe("snapshots", () => {
    it("App snapshot", () => {
        const app = shallow( < App/> );
        expect(toJson(app)).toMatchSnapshot();
    });    
});
