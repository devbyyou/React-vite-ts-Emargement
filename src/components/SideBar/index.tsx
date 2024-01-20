/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { PiUsersThreeLight } from 'react-icons/pi';
import { LuClipboardSignature } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
// import logo from '../../assets/devbyyou.png';

interface NavLinkParams {
  isActive: boolean;
}

function SideBar() {
  const token = useAppSelector((state) => state.user.token);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { joueur, user } = token;

  const classNameLink = ({ isActive }: NavLinkParams) => cn('icons', {
    'menu-link--active': isActive,
  });
  const classNameLinkResponsive = ({ isActive }: NavLinkParams) => cn('nav__link', {
    'active-link': isActive,
  });
  const isNavbarVisible = scrollPosition < document.body.scrollHeight - window.innerHeight
  || document.body.scrollHeight <= window.innerHeight;
  const navbarClasses = cn(
    'nav__menu',
    {
      visible: isNavbarVisible,
      invisible: !isNavbarVisible,
    },
  );
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Ajoutez un écouteur d'événements pour détecter le défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyez l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Assurez-vous que l'effet s'exécute une seule fois à l'initialisation

  return (
    <div className="responsive__sidebar">
      <nav className={navbarClasses}>
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/" className={classNameLinkResponsive}>
              <p className="bx bx-home-alt nav__icon">
                {' '}
                <GoHome />
              </p>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to="/equipes" className={classNameLinkResponsive}>
              <p className="bx bx-user nav__icon">
                {' '}
                <PiUsersThreeLight />
              </p>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to="/presents" className={classNameLinkResponsive}>
              <p className="bx bx-book nav__icon">
                {' '}
                <LuClipboardSignature />
              </p>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to="/parametre" className={classNameLinkResponsive}>
              <p className="bx bx-briefcase-alt-2 nav__icon">

                <AiOutlineSetting />
              </p>
            </NavLink>
          </li>

        </ul>
      </nav>

      <nav className="sidebar">
        <svg
                    // width="350"
                    // height="207.999"
          cursor="pointer"
          className="logo"
                    // transform="translate(-50 -50) scale(.54857)"
          viewBox="0 0 350 207.999"
          style={{
          // width: 350,
          // height: 207.999,
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // zIndex: "0",
          }}
          overflow="visible"
        >
          <defs>

            <linearGradient id="SvgjsLinearGradient1676">
              <stop offset="0" stopColor="#89bfaa" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#939598" stopOpacity="0.5" />
              <stop offset="1" stopColor="#89bfaa" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="SvgjsLinearGradient1680">
              <stop offset="0" stopColor="#89bfaa" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#939598" stopOpacity="0.5" />
              <stop offset="1" stopColor="#89bfaa" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#SvgjsLinearGradient1676)"
            d="M50.5 35.435h4.943v6.179h2.472V24.312h-2.472v8.65h-4.375v-2.471h-4.943v2.472H50.5v2.472zm24.716-8.651h-9.887v9.886h9.887v-9.886zM50.5 39.142h.568V36.67h-4.943v2.472h-.568v-14.83h-2.472v17.301H50.5v-2.471zm1.972-11.864h-4.943v2.472h4.943v-2.472zm10.385 16.807v2.471h-4.942v2.472h9.886v-4.943h-4.944zm17.302 14.83v-2.472h-4.943v2.472h4.943zm-2.471-4.943V51.5h2.472v-4.943h-2.472v-2.471h-7.415v4.943h4.943V51.5h-2.472v2.472h-2.472v-4.943H67.8v9.887h4.943v-2.472h2.472v-2.472h2.473zm-12.359 9.886h4.943v-2.472h-4.943v2.472zM10.955 13.932h15.818V9.978H7V29.75h3.955V13.932zm69.204 7.909H60.387v19.773h19.772V21.841zm-2.471 17.301h-14.83v-14.83h14.83v14.83zM60.387 76.216h4.942v-2.472h-4.942v2.472zM25.784 36.67h9.886v-9.886h-9.886v9.886zM50.5 73.744h-4.943v4.943H50.5v2.472h4.943v-2.472h2.472v2.472h4.942v-2.472h-2.471v-2.472H50.5v-2.471zM74.228 9.978v3.954h15.817V29.75H94V9.978H74.228zm5.931 71.181v-9.887h-4.943v4.943h-2.472v-2.472h-2.472v-2.472h4.943V66.33h2.472v-2.472h2.472v-2.472h-4.943v2.472h-2.472v2.472h-4.943v2.471h-2.472V66.33h-9.886v-2.472h2.472v-2.472h2.472v-2.472h2.471v-4.943h-2.471V51.5h-7.415v4.943H50.5v9.887h-2.472v-4.943h-4.943v4.943h2.472v4.942h7.415v2.472h7.415v-4.943h2.471v2.472h2.472v2.472h2.472v2.472h2.472v2.472h2.472v2.472h7.413zM52.972 58.915h2.472v2.472h-2.472v-2.472zm2.471-9.887v-4.943H35.67v2.471h-2.472v-2.471h-7.415v4.943h4.943V51.5h-2.472v2.472h-2.472v-4.943h-4.943v9.887h7.415v-2.472h2.472v-2.472h2.471V51.5h2.472v-2.472h2.472v-2.472h2.472V51.5h-2.472v2.472h4.943v-4.943h2.472v7.415H33.199v2.472h14.83v-2.472H50.5v-7.415h4.943zM20.841 81.159h19.773V61.387H20.841v19.772zm2.471-17.301h14.83v14.829h-14.83V63.858zm-2.471-22.244h19.773V21.841H20.841v19.773zm2.471-17.302h14.83v14.83h-14.83v-14.83zM10.955 73.25H7v19.772h19.772v-3.954H10.955V73.25zm14.829 2.966h9.886V66.33h-9.886v9.886zm64.261 12.852H74.228v3.954H94V73.25h-3.955v15.818z"
            transform="matrix(1.6092 0 0 1.6092 93.736 -16.057)"
          />
          <path
            fill="url(#SvgjsLinearGradient1680)"
            d="M14.08 13.6c2.72 0 4.76.76 6.12 2.24 1.2 1.32 1.8 3.28 1.8 5.68v10.6c0 4.84-2.8 7.88-7.92 7.88h-10c-.2 0-.32-.16-.32-.36V13.96c0-.2.12-.36.32-.36h10zm2.68 17.32v-8.2c0-2.52-1.32-4.12-4.12-4.12h-3.6V35h3.6c2.4 0 4.12-1.56 4.12-4.08zM6.2 16.04v21.52c0 .16.16.2.24.2h6.52c4.6 0 6.68-2.76 6.68-5.32V22.2c0-4.24-2.24-6.4-6.8-6.4h-6.4c-.08 0-.24.04-.24.24zm12.96 6.16v10.24c0 3.2-3.2 4.88-6.2 4.88H6.68v-21h6.16c4.2 0 6.32 1.88 6.32 5.88zM29.32 40c-.2 0-.32-.16-.32-.36V13.96c0-.2.12-.36.32-.36h13.6c.2 0 .36.16.36.36v4.28c0 .2-.16.36-.36.36h-8.64v5.44H41c.2 0 .32.16.32.36v4.36c0 .2-.12.36-.32.36h-6.72V35h8.64c.2 0 .36.16.36.36v4.28c0 .2-.16.36-.36.36h-13.6zm2-23.88V37.4c0 .24.16.32.32.32h9.2c.36 0 .28-.48 0-.48h-9V26.8h7.36c.24 0 .24-.56 0-.56h-7.36v-9.92h9c.28 0 .36-.52 0-.52h-9.2c-.16 0-.32.12-.32.32zm22.12-2.28l4.4 16.56 4.52-16.56c.08-.12.16-.24.32-.24h4.56c.24 0 .4.2.32.44l-6.92 25.72c-.08.16-.16.24-.32.24h-4.96c-.12 0-.24-.08-.28-.24l-6.92-25.72c-.04-.24.12-.44.36-.44h4.6c.16 0 .24.12.32.24zm4.32 23.4l-6.68-21.32c-.12-.32-.56-.12-.44.12l6.64 21.36c.16.6.8.64 1 0l6.4-21.36c.08-.24-.36-.4-.44-.12zm30.44-16.8c0 1.56-.24 2.92-.8 3.92 1.52 1.44 2.16 3.76 2.16 7 0 3.44-.72 5.88-2.36 7.16-1.56 1.24-3.76 1.48-5.96 1.48h-7.8c-.2 0-.32-.16-.32-.36V13.96c0-.2.12-.36.32-.36h6.4c2.16 0 4.4.16 5.92 1.16 1.88 1.2 2.44 3.36 2.44 5.68zm-9.8-1.6v3.6h2.44c1.28 0 1.96-.4 1.96-1.8s-1.04-1.8-2.8-1.8h-1.6zm1.52 15.92c2.2 0 4.28-.96 4.28-3.52 0-1.92-1.36-3.44-3.4-3.44h-2.4v6.96h1.52zm-4.48-18.64v21.32c0 .2.16.28.32.28h5.36c3.88 0 6.2-1.96 6.2-6.16 0-3-.68-6.12-3.8-7 1.84-.6 2.32-2.44 2.32-4.4 0-3.2-1.8-4.36-5.04-4.36h-5.04c-.24 0-.32.12-.32.32zm5.08 21.12h-4.56V24.92h5.64c4.12 0 5.16 2.68 5.16 6.64 0 4.04-2.2 5.84-6.24 5.68zm4.84-17.08c0 3.24-1.36 4.24-4.64 4.24h-4.76v-8.08h4.84c2.36 0 4.56.44 4.56 3.84zm13.76-6.36l3.48 6.72 3.4-6.72c.12-.2.16-.2.32-.2h4.48c.24 0 .4.24.32.44l-5.8 13.48v12.12c0 .2-.16.36-.36.36h-4.72c-.12 0-.28-.16-.28-.36V27.52L94 14.12c-.08-.28.04-.52.32-.52h4.48c.16 0 .2 0 .32.2zm3.68 12.8l5-10.4c.12-.24-.28-.44-.44-.16L102.6 26l-4.88-9.96c-.16-.28-.6-.08-.48.2l5.12 10.36v11.04c0 .28.44.32.44 0V26.6zm16.76-12.8l3.48 6.72 3.4-6.72c.12-.2.16-.2.32-.2h4.48c.24 0 .4.24.32.44l-5.8 13.48v12.12c0 .2-.16.36-.36.36h-4.72c-.12 0-.28-.16-.28-.36V27.52l-5.96-13.4c-.08-.28.04-.52.32-.52h4.48c.16 0 .2 0 .32.2zm3.68 12.8l5-10.4c.12-.24-.28-.44-.44-.16L123.04 26l-4.88-9.96c-.16-.28-.6-.08-.48.2l5.12 10.36v11.04c0 .28.44.32.44 0V26.6zm22.44-13.36c3.44 0 5.84.76 7.36 2.4 1.2 1.32 1.76 3.2 1.76 5.88v10.52c0 2.76-.56 4.68-1.76 5.96-1.56 1.6-3.92 2.4-7.36 2.4-3.56 0-5.88-.8-7.4-2.4-1.16-1.28-1.8-3.2-1.8-5.96V21.52c0-2.68.64-4.56 1.8-5.92 1.56-1.6 3.92-2.36 7.4-2.36zm3.8 17.6v-8c0-3.52-1.88-4.24-3.6-4.24h-.48c-2.56 0-3.56 1.64-3.56 4.24v8c0 3.52 1.88 4.28 3.56 4.28h.48c2.56 0 3.56-1.72 3.6-4.28zM139 21.8v9.92c0 1.88.48 3.44 1.6 4.6 1.04 1.04 2.64 1.6 4.6 1.6h1.04c3.76 0 6.2-2.4 6.2-6.2V21.8c0-4.08-2.16-6.28-6.2-6.28h-1.04c-4.08 0-6.2 2.2-6.2 6.28zm7.24 15.6h-1.04c-1.88 0-3.28-.48-4.28-1.48s-1.52-2.4-1.52-4.2V21.8c0-3.8 2.04-5.8 5.8-5.8h1.04c3.8 0 5.68 1.96 5.68 5.8v9.92c0 1.68-.52 3.2-1.6 4.24-1.04.88-2.44 1.44-4.08 1.44zm28.28-6.64v-16.8c0-.2.16-.36.36-.36h4.56c.2 0 .36.16.36.36v18.08c0 5.76-3.16 8.36-9.12 8.36-5.64 0-9.16-2.24-9.16-8.36V13.96c0-.2.16-.36.36-.36h4.6c.2 0 .36.16.36.36v16.8c0 3.48 1.96 4.24 3.6 4.24h.48c2.48 0 3.6-1.68 3.6-4.24zM164 16.16v15.56c0 3.6 2.44 6.2 6.24 6.2h1c3.8 0 6.28-2.72 6.28-6.2V16.16c0-.36-.48-.4-.48 0v15.56c0 3.28-2.36 5.68-5.8 5.68h-1c-3.36 0-5.76-2.16-5.76-5.68V16.16c0-.36-.48-.36-.48 0z"
            transform="matrix(1.98818 0 0 1.98818 -7.476 127.676)"
          />
        </svg>

        { user ? (
          <div className="sidebarLink">

            <NavLink className={classNameLink} to="/">
              <GoHome />
              Home
            </NavLink>
            <NavLink className={classNameLink} to="/equipes">
              <PiUsersThreeLight />
              Equipes
            </NavLink>
            <NavLink className={classNameLink} to="/presents">
              <LuClipboardSignature />
              Presents
            </NavLink>
            <NavLink className={classNameLink} to="/parametre">
              <AiOutlineSetting />
              Paramètre
            </NavLink>

          </div>

        ) : (
          <div className="sidebarLink">

            <NavLink className={classNameLink} to="/pageJoueur">
              <GoHome />
              Page Joueur
            </NavLink>
            <NavLink className={classNameLink} to="/parametre">
              <AiOutlineSetting />
              Paramètre
            </NavLink>
          </div>
        )}
        {/* <NavLink className={classNameLink} to="/inscription">
          <GoHome />
          Inscription

        </NavLink> */}

      </nav>
    </div>

  );
}

export default SideBar;
