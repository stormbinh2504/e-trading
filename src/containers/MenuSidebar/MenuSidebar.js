import React, { Component } from "react";
import { PATH_NAME, setPathName } from '../../utils';
import { Link, useHistory, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./MenuSidebar.scss";
import { MdDashboard, MdOpenInBrowser } from "react-icons/md";
import { Sidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, useProSidebar, ProSidebarProvider } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';


const MenuSidebar = ({ setIsOpenMenu }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const handleToggleSidebar = () => {

  }

  const checkActiveMenu = (key) => {
    let pathnameCurent = window.location.pathname
    if (pathnameCurent === key) {
      return true
    }
    return false
  }

  const onRedirectByPathname = (path) => {
    history.push(path);
    // setIsOpenMenu(false)
  }


  return (
    <div className="ProSidebar">
      <Sidebar
        image={false}
        // rtl={false}
        collapsed={false}
        toggled={false}
        onToggle={handleToggleSidebar}
        rootStyles={{ width: "300px" }}
      >
        <Menu>
          <Menu iconShape="circle" rootStyles={{ paddingLeft: "16px" }}>
            <MenuItem
              active={checkActiveMenu(PATH_NAME.HOME)}
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              onClick={(e) => onRedirectByPathname(PATH_NAME.HOME)}
            >
              Trang chủ
            </MenuItem>
          </Menu>
          <SubMenu
            label="Sản phẩm"
            icon={<i className="fa fa-list-alt" aria-hidden="true"></i>}
            defaultOpen={true}
          >
            <SubMenu label="Kệ để hàng nặng">
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_DRIVER_IN)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_DRIVER_IN)}
              >
                Kệ Drive-in
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_SELECTIVE)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_SELECTIVE)}
              >
                Kệ Selective
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_DOUBLE_DEEP)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_DOUBLE_DEEP)}
              >
                Kệ Double Deep
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_NARROW_AISLE)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_NARROW_AISLE)}
              >
                Kệ Narrow Aisle
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_PALLET_DI_DONG)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_PALLET_DI_DONG)}
              >
                Kệ Pallet di động
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_CON_LAN_PALLET_FLOW_RACK)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_CON_LAN_PALLET_FLOW_RACK)}
              >
                Kệ con lăn
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_PUSH_BACK)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_PUSH_BACK)}
              >
                Kệ Push back
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_TAY_DO)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_TAY_DO)}
              >
                Kệ tay đỡ
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_DE_KHUON_MOULD_RACK)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_DE_KHUON_MOULD_RACK)}
              >
                Kệ để khuôn
              </MenuItem>
            </SubMenu>

            <SubMenu label="Kệ để hàng trung tải">
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_TRUNG_TAI)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_TRUNG_TAI)}
              >
                Kệ trung tải
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_CON_LAN_TRUNG_TAI)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_CON_LAN_TRUNG_TAI)}
              >
                Kệ con lăn trung tải
              </MenuItem>
            </SubMenu>

            <SubMenu label="Kệ để hàng nhẹ">
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_V_HOA)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_V_HOA)}
              >
                Kệ V hoa
              </MenuItem>
              <MenuItem
                active={checkActiveMenu(PATH_NAME.KE_V_LO)}
                onClick={(e) => onRedirectByPathname(PATH_NAME.KE_V_LO)}
              >
                Kệ V lỗ
              </MenuItem>
            </SubMenu>

            <MenuItem
              active={checkActiveMenu(PATH_NAME.KE_SAN_MEZZANINE)}
              onClick={(e) => onRedirectByPathname(PATH_NAME.KE_SAN_MEZZANINE)}
            >
              Kệ sàn Mezzanine
            </MenuItem>

            <MenuItem
              active={checkActiveMenu(PATH_NAME.KE_XEP_CHONG)}
              onClick={(e) => onRedirectByPathname(PATH_NAME.KE_XEP_CHONG)}
            >
              Kệ xếp chồng
            </MenuItem>

            <MenuItem
              active={checkActiveMenu(PATH_NAME.KE_DE_HANG_BAN_TU_DONG)}
              onClick={(e) => onRedirectByPathname(PATH_NAME.KE_DE_HANG_BAN_TU_DONG)}
            >
              Kệ để hàng tự động
            </MenuItem>

            <MenuItem
              active={checkActiveMenu(PATH_NAME.KE_SIEU_THI)}
              onClick={(e) => onRedirectByPathname(PATH_NAME.KE_SIEU_THI)}
            >
              Kệ siêu thị
            </MenuItem>

          </SubMenu>
          <Menu iconShape="circle" rootStyles={{ paddingLeft: "16px" }}>
            <MenuItem
              active={checkActiveMenu(PATH_NAME.BLOGS)}
              icon={<i className="fa fa-trophy" aria-hidden="true"></i>}
              onClick={(e) => onRedirectByPathname(PATH_NAME.BLOGS)}
            >
              Dự án hoàn thành
            </MenuItem>
          </Menu>
          <Menu iconShape="circle" rootStyles={{ paddingLeft: "16px" }}>
            <MenuItem
              active={checkActiveMenu(PATH_NAME.ABOUT_OUR)}
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              onClick={(e) => onRedirectByPathname(PATH_NAME.ABOUT_OUR)}
            >
              Về chúng tôi
            </MenuItem>
          </Menu>
          <Menu iconShape="circle" rootStyles={{ paddingLeft: "16px" }}>
            <MenuItem
              active={checkActiveMenu(PATH_NAME.CONTACT)}
              icon={<i className="fa fa-comments" aria-hidden="true"></i>}
              onClick={(e) => onRedirectByPathname(PATH_NAME.CONTACT)}
            >
              Liên hệ
            </MenuItem>
          </Menu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default MenuSidebar;
