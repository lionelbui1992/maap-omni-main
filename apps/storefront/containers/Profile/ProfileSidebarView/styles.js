import css from 'styled-jsx/css';

export const styles = css`
    .profile-sidebar-view::-webkit-scrollbar {
        display: none;
    }
    .profile-sidebar-view {
        display: none;
        position: relative;
    }
    .profile-sidebar-view__embed {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        border: 0;
    }
    .profile-sidebar-view--active {
        display: flex;
        flex: 1;
    }
    .profile-sidebar-view--hovered {
        display: initial;
    }
    .profile_nav__menu {
        padding: 22px 10px;
        display: none;
    }
    .profile_nav__menu--active {
        display: initial;
    }
    .profile_nav__menu:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .assistance__top_content {
        background-color: #d9d9d9;
        padding: 12px;
        width: 100%;
        height: auto;
    }
    .profile__wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;
