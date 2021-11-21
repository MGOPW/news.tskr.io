import { Link, NavLink, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const NavSidebar = ({ children }) => {
  const { hasRole, currentUser } = useAuth()
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <div id="navSideBar" className="hidden xl:block xl:h-screen w-6/6">
        <div className="w-full h-full bg-white rounded p-3 shadow-lg">
          <div className="flex items-center space-x-4 p-2 mb-5">
            <img
              className="h-12 rounded-full"
              src={`http://www.gravatar.com/avatar/${currentUser.md5Email}?s=260&d=mp`}
              alt="{currentUser.name}"
            />

            <div>
              <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                <Link to={routes.user({ id: currentUser.id })}>
                  {currentUser.name}
                </Link>
              </h4>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to={routes.about()}
                activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.user({ id: currentUser.id })}
                activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      fill="none"
                      d="M12.443,9.672c0.203-0.496,0.329-1.052,0.329-1.652c0-1.969-1.241-3.565-2.772-3.565S7.228,6.051,7.228,8.02c0,0.599,0.126,1.156,0.33,1.652c-1.379,0.555-2.31,1.553-2.31,2.704c0,1.75,2.128,3.169,4.753,3.169c2.624,0,4.753-1.419,4.753-3.169C14.753,11.225,13.821,10.227,12.443,9.672z M10,5.247c1.094,0,1.98,1.242,1.98,2.773c0,1.531-0.887,2.772-1.98,2.772S8.02,9.551,8.02,8.02C8.02,6.489,8.906,5.247,10,5.247z M10,14.753c-2.187,0-3.96-1.063-3.96-2.377c0-0.854,0.757-1.596,1.885-2.015c0.508,0.745,1.245,1.224,2.076,1.224s1.567-0.479,2.076-1.224c1.127,0.418,1.885,1.162,1.885,2.015C13.961,13.689,12.188,14.753,10,14.753z M10,0.891c-5.031,0-9.109,4.079-9.109,9.109c0,5.031,4.079,9.109,9.109,9.109c5.031,0,9.109-4.078,9.109-9.109C19.109,4.969,15.031,0.891,10,0.891z M10,18.317c-4.593,0-8.317-3.725-8.317-8.317c0-4.593,3.724-8.317,8.317-8.317c4.593,0,8.317,3.724,8.317,8.317C18.317,14.593,14.593,18.317,10,18.317z"
                    ></path>
                  </svg>
                </span>
                <span>My profile</span>
              </NavLink>
            </li>
            {hasRole(['userRead', 'admin']) && (
              <li>
                <NavLink
                  to={routes.users()}
                  activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                >
                  <span className="text-gray-600">
                    <svg
                      className="h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      {/*<path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      /> */}
                      <path d="M10,1.75c-4.557,0-8.25,3.693-8.25,8.25c0,4.557,3.693,8.25,8.25,8.25c4.557,0,8.25-3.693,8.25-8.25C18.25,5.443,14.557,1.75,10,1.75 M10,17.382c-4.071,0-7.381-3.312-7.381-7.382c0-4.071,3.311-7.381,7.381-7.381c4.07,0,7.381,3.311,7.381,7.381C17.381,14.07,14.07,17.382,10,17.382 M7.612,10.869c-0.838,0-1.52,0.681-1.52,1.519s0.682,1.521,1.52,1.521c0.838,0,1.52-0.683,1.52-1.521S8.45,10.869,7.612,10.869 M7.612,13.039c-0.359,0-0.651-0.293-0.651-0.651c0-0.357,0.292-0.65,0.651-0.65c0.358,0,0.651,0.293,0.651,0.65C8.263,12.746,7.97,13.039,7.612,13.039 M7.629,6.11c-0.838,0-1.52,0.682-1.52,1.52c0,0.838,0.682,1.521,1.52,1.521c0.838,0,1.521-0.682,1.521-1.521C9.15,6.792,8.468,6.11,7.629,6.11M7.629,8.281c-0.358,0-0.651-0.292-0.651-0.651c0-0.358,0.292-0.651,0.651-0.651c0.359,0,0.651,0.292,0.651,0.651C8.281,7.988,7.988,8.281,7.629,8.281 M12.375,10.855c-0.838,0-1.521,0.682-1.521,1.52s0.683,1.52,1.521,1.52s1.52-0.682,1.52-1.52S13.213,10.855,12.375,10.855 M12.375,13.026c-0.358,0-0.652-0.294-0.652-0.651c0-0.358,0.294-0.652,0.652-0.652c0.357,0,0.65,0.294,0.65,0.652C13.025,12.732,12.732,13.026,12.375,13.026 M12.389,6.092c-0.839,0-1.52,0.682-1.52,1.52c0,0.838,0.681,1.52,1.52,1.52c0.838,0,1.52-0.681,1.52-1.52C13.908,6.774,13.227,6.092,12.389,6.092 M12.389,8.263c-0.36,0-0.652-0.293-0.652-0.651c0-0.359,0.292-0.651,0.652-0.651c0.357,0,0.65,0.292,0.65,0.651C13.039,7.97,12.746,8.263,12.389,8.263"></path>{' '}
                    </svg>
                  </span>
                  <span>All Users</span>
                </NavLink>
              </li>
            )}
            {hasRole(['groupRead', 'admin']) && (
              <li>
                <NavLink
                  to={routes.groups()}
                  activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                >
                  <span className=" text-gray-600">
                    <svg
                      className="h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298"></path>
                    </svg>
                  </span>
                  <span>All Groups</span>
                </NavLink>
              </li>
            )}
            {hasRole(['groupMemberRead', 'admin']) && (
              <li>
                <NavLink
                  to={routes.groupMembers()}
                  activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                >
                  <span className=" text-gray-600">
                    <svg
                      className="h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298"></path>
                    </svg>
                  </span>
                  <span>All Group Members</span>
                </NavLink>
              </li>
            )}
            {hasRole(['groupRoleRead', 'admin']) && (
              <li>
                <NavLink
                  to={routes.groupRoles()}
                  activeClassName="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                >
                  <span className=" text-gray-600">
                    <svg
                      className="h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298"></path>
                    </svg>
                  </span>
                  <span>All Group Roles</span>
                </NavLink>
              </li>
            )}
            <li>
              <a
                href="/#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    {/*<path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>*/}
                    <path
                      fill="none"
                      d="M15.808,14.066H6.516v-1.162H5.354v1.162H4.193c-0.321,0-0.581,0.26-0.581,0.58s0.26,0.58,0.581,0.58h1.162
								v1.162h1.162v-1.162h9.292c0.32,0,0.58-0.26,0.58-0.58S16.128,14.066,15.808,14.066z M15.808,9.419h-1.742V8.258h-1.162v1.161
								h-8.71c-0.321,0-0.581,0.26-0.581,0.581c0,0.321,0.26,0.581,0.581,0.581h8.71v1.161h1.162v-1.161h1.742
								c0.32,0,0.58-0.26,0.58-0.581C16.388,9.679,16.128,9.419,15.808,9.419z M17.55,0.708H2.451c-0.962,0-1.742,0.78-1.742,1.742v15.1
								c0,0.961,0.78,1.74,1.742,1.74H17.55c0.962,0,1.742-0.779,1.742-1.74v-15.1C19.292,1.488,18.512,0.708,17.55,0.708z M18.13,17.551
								c0,0.32-0.26,0.58-0.58,0.58H2.451c-0.321,0-0.581-0.26-0.581-0.58v-15.1c0-0.321,0.26-0.581,0.581-0.581H17.55
								c0.32,0,0.58,0.26,0.58,0.581V17.551z M15.808,4.774H9.419V3.612H8.258v1.162H4.193c-0.321,0-0.581,0.26-0.581,0.581
								s0.26,0.581,0.581,0.581h4.065v1.162h1.161V5.935h6.388c0.32,0,0.58-0.26,0.58-0.581S16.128,4.774,15.808,4.774z"
                    ></path>
                  </svg>
                </span>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <Link
                to={routes.resetPassword()}
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <span>Change password</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
                to={routes.logout()}
              >
                <span className="text-gray-600">
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="xl:w-9/12 w-full">
        <div className="p-4 text-gray-500">{children}</div>
      </div>
    </div>
  )
}

export default NavSidebar
