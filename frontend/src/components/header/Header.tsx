import React from 'react';
import {
    Header as CarbonHeader,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
    HeaderGlobalAction
} from '@carbon/react';
import { Information, Login, Logout } from '@carbon/react/icons';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { logout } from '../../features/auth/authSlice';
import { useLocation } from 'react-router-dom'

/**
 * Represents the application header.
 */
const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }: { isSideNavExpanded: any, onClickSideNavExpand: any }) => (
                <CarbonHeader aria-label="Carbon Tutorial">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName element={Link} to="/" prefix="Chow">
                        Checker
                    </HeaderName>
                    <HeaderNavigation aria-label="Carbon Tutorial">
                        <HeaderMenuItem
                            isCurrentPage={location.pathname === '/search'}
                            element={Link}
                            to="/search"
                        >
                            Search Food
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            isCurrentPage={location.pathname === '/dashboard'}
                            element={Link}
                            to="/dashboard"
                        >
                            Dashboard
                        </HeaderMenuItem>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        isPersistent={false}
                        expanded={isSideNavExpanded}
                    >
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenuItem element={Link} to="/dashboard">Dashboard</HeaderMenuItem>
                                <HeaderMenuItem element={Link} to="/search">Search Food</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar>
                        {isAuthenticated ? (
                            <HeaderGlobalAction
                                aria-label="Logout"
                                onClick={logoutHandler}>
                                <Logout size={20} />
                            </HeaderGlobalAction>
                        ) : (
                            <HeaderGlobalAction
                                aria-label="Login"
                                onClick={() => navigate('/login')}>
                                <Login size={20} />
                            </HeaderGlobalAction>
                        )}
                        <HeaderGlobalAction
                            aria-label="About the App"
                            tooltipAlignment="end"
                            onClick={() => navigate('/about')}
                        >
                            <Information size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </CarbonHeader>
            )}
        />
    );
};
export default Header;