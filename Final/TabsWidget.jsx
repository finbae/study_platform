import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import "./TabsWidget.css";
import { RiTodoLine, RiMapPin2Line } from "react-icons/ri";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { BiConversation } from "react-icons/bi";
import { IoHomeSharp } from "react-icons/io5";


const Tab5Content = lazy(() => import('./components/Tab5'));
const Tab1Content = lazy(() => import('./components/Tab1'));
const Tab2Content = lazy(() => import('./components/Tab2'));
const Tab3Content = lazy(() => import('./components/Tab3'));
const Tab4Content = lazy(() => import('./components/Tab4'));

const TabsWidget = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 selectedTab 값을 가져와 설정
    const storedTab = localStorage.getItem('selectedTab');
    setSelectedTab(storedTab || 'tab5');
  }, []);

  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
  };

  const activeStyle = {
    color: "#6392ff",
  };

  return (
    <Router>
      <div className="tabwidget">
        <div className="widget">
          {['tab5', 'tab1', 'tab2', 'tab3', 'tab4'].map((tabId) => (
            <input
              key={tabId}
              type="radio"
              id={tabId}
              name="tab-control"
              checked={selectedTab === tabId}
              onChange={() => handleTabChange(tabId)}
            />
          ))}
        </div>

        <div className="tab">
          <ul>
            <li title="home">
              <NavLink to="/tab5" style={{ textDecoration: "none" }} activeStyle={activeStyle}>
                <IoHomeSharp className="custom-icon" /><span>home</span>
              </NavLink>
            </li>

            <li title="todo">
              <NavLink to="/tab1" style={{ textDecoration: "none" }} activeStyle={activeStyle}>
                <RiTodoLine className="custom-icon" /><span>todo</span>
              </NavLink>
            </li>

            <li title="memo">
              <NavLink to="/tab2" style={{ textDecoration: "none" }} activeStyle={activeStyle}>
                <MdOutlineAutoAwesomeMotion className="custom-icon" /><span>memo</span>
              </NavLink>
            </li>

            <li title="reservation">
              <NavLink to="/tab3" style={{ textDecoration: "none" }} activeStyle={activeStyle}>
                <BiConversation className="custom-icon" /><span>reservation</span>
              </NavLink>
            </li>

            <li title="map">
              <NavLink to="/tab4" style={{ textDecoration: "none" }} activeStyle={activeStyle}>
                <RiMapPin2Line className="custom-icon" /><span>map</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="slider">
          <div className="indicator"></div>
        </div>

        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/tab5" element={<Tab5Content />} />
              <Route path="/tab1" element={<Tab1Content />} />
              <Route path="/tab2" element={<Tab2Content />} />
              <Route path="/tab3" element={<Tab3Content />} />
              <Route path="/tab4" element={<Tab4Content />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default TabsWidget;
