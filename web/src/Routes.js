// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import FeedItemParticipantsLayout from 'src/layouts/FeedItemParticipantsLayout'
import ParticipantsLayout from 'src/layouts/ParticipantsLayout'
import FeedItemsLayout from 'src/layouts/FeedItemsLayout'
import FeedsLayout from 'src/layouts/FeedsLayout'
import LogsLayout from 'src/layouts/LogsLayout'
import MessagesLayout from 'src/layouts/MessagesLayout'
import PropertiesLayout from 'src/layouts/PropertiesLayout'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import PreferencesLayout from 'src/layouts/PreferencesLayout'
import Standard from './layouts/Standard/Standard'
import AboutPage from 'src/pages/AboutPage'
import HomePage from 'src/pages/HomePage'

const Routes = () => {
  return (
    <Router>
      <Route path="/forgot-password" whileLoadingAuth={() => <>Loading...</>} page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/feed-items" page={FeedItemFeedItemsPage} name="feedItems" />
        <Route path="/feed-items/new" page={FeedItemNewFeedItemPage} name="newFeedItem" />
        <Route path="/feed-items/{id:Int}" page={FeedItemEditFeedItemPage} name="feedItem" />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/my-profile" page={MyProfilePage} name="myProfile" />
          <Set wrap={FeedItemParticipantsLayout}>
            <Route path="/feed-item-participants/new" page={FeedItemParticipantNewFeedItemParticipantPage} name="newFeedItemParticipant" />
            <Route path="/feed-item-participants/{id:Int}/edit" page={FeedItemParticipantEditFeedItemParticipantPage} name="editFeedItemParticipant" />
            <Route path="/feed-item-participants/{id:Int}" page={FeedItemParticipantFeedItemParticipantPage} name="feedItemParticipant" />
            <Route path="/feed-item-participants" page={FeedItemParticipantFeedItemParticipantsPage} name="feedItemParticipants" />
          </Set>
          <Set wrap={FeedItemsLayout}>
            <Route path="/feed-items/{id:Int}/edit" page={FeedItemEditFeedItemPage} name="editFeedItem" />
          </Set>
          <Set wrap={ParticipantsLayout}>
            <Route path="/participants/new" page={ParticipantNewParticipantPage} name="newParticipant" />
            <Route path="/participants/{id:Int}/edit" page={ParticipantEditParticipantPage} name="editParticipant" />
            <Route path="/participants/{id:Int}" page={ParticipantParticipantPage} name="participant" />
            <Route path="/participants" page={ParticipantParticipantsPage} name="participants" />
          </Set>
          <Set wrap={FeedsLayout}>
            <Route path="/feeds/new" page={FeedNewFeedPage} name="newFeed" />
            <Route path="/feeds/{id:Int}/edit" page={FeedEditFeedPage} name="editFeed" />
            <Route path="/feeds/{id:Int}" page={FeedEditFeedPage} name="feed" />
            <Route path="/feeds" page={FeedFeedsPage} name="feeds" />
          </Set>
          <Set wrap={MessagesLayout}>
            <Route path="/messages/new" page={MessageNewMessagePage} name="newMessage" />
            <Route path="/messages/{id:Int}" page={MessageEditMessagePage} name="editMessage" />
            <Route path="/messages" page={MessageMessagesPage} name="messages" />
          </Set>
          <Set wrap={LogsLayout}>
            <Route path="/logs/new" page={LogNewLogPage} name="newLog" />
            <Route path="/logs/{id}/edit" page={LogEditLogPage} name="editLog" />
            <Route path="/logs/{id}" page={LogEditLogPage} name="log" />
            <Route path="/logs" page={LogLogsPage} name="logs" />
          </Set>
          <Set wrap={PropertiesLayout}>
            <Route path="/properties/new" page={PropertyNewPropertyPage} name="newProperty" />
            <Route path="/properties/{id:Int}/edit" page={PropertyEditPropertyPage} name="editProperty" />
            <Route path="/properties/{id:Int}" page={PropertyEditPropertyPage} name="property" />
            <Route path="/properties" page={PropertyPropertiesPage} name="properties" />
          </Set>

          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate', 'groupRead']}>
              <Route path="/groups/{id:Int}" page={GroupEditGroupPage} name="group" />
              <Route path="/groups" page={GroupGroupsPage} name="groups" />
            </Private>
          </Set>
          <Set wrap={PreferencesLayout}>
            <Private unauthenticated="home">
              <Route path="/preferences/new" page={PreferenceNewPreferencePage} name="newPreference" />
            </Private>
            <Private unauthenticated="home">
              <Route path="/preferences/{id:Int}" page={PreferenceEditPreferencePage} name="preference" />
              <Route path="/preferences" page={PreferencePreferencesPage} name="preferences" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate', 'userRead']}>
              <Route path="/users/{id:Int}" page={UserEditUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate', 'groupMemberRead']}>
              <Route path="/group-members/{id:Int}" page={GroupMemberEditGroupMemberPage} name="groupMember" />
              <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              <Route path="/group-roles/{id:Int}" page={GroupRoleEditGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
