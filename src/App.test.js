import * as enzyme from 'enzyme';
import * as React from 'react';
import Absences from './subcomponents/absenceData';
import AbsenceList from './AbsenceList';
import Enzyme, { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";

describe("rendering components", () => {

    it("renders absence component without crashing", () => {
        const wrapper = shallow( < Absences/> );
    });

    it("renders Absences component without crashing", () => {
        shallow( < AbsenceList/> );
    });
});
describe("snapshots", () => {
    it(" abs    snapshot", () => {
        const abs = shallow( < AbsenceList/> );
        expect(toJson(abs)).toMatchSnapshot();
    });    
});
