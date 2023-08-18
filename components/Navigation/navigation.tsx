import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Tooltip,
  useToast
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form";
import connexion from "../Auth/connect"
import inscription from "../Auth/signup"

import styles from "./Navigation.module.css"
import stylesButton from "./Button.module.css"
import stylesModal from "./Modal.module.css"

import React, { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineUser, AiOutlineHome, AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai'
import { IoExitOutline } from 'react-icons/io5'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { GiSettingsKnobs, GiExitDoor } from 'react-icons/gi'
import { GiHammerBreak, GiScythe, GiRuneStone, GiTrade, GiAbdominalArmor } from 'react-icons/gi'
import {GrContactInfo} from 'react-icons/gr'

import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'

const MENUCONST = [
  {
    "link": "/",
    "name": "Home",
    "icon": <AiOutlineHome />
  },
  {
    "link": "/outils/brisage",
    "name": "Brisage",
    "icon": <GiHammerBreak />
  },
  {
    "link": "/outils/fm",
    "name": "FM",
    "icon": <GiRuneStone />
  },
  {
    "link": "/outils/metiers",
    "name": "Métiers",
    "icon": <GiScythe />
  },
  {
    "link": "/outils/almanax",
    "name": "Almanax",
    "icon": <AiOutlineCalendar />
  },
  {
    "link": "/outils/equip",
    "name": "Equipements",
    "icon": <GiAbdominalArmor />
  },
  {
    "link": "/outils/tradehelper",
    "name": "TradeHelper",
    "icon": <GiTrade />
  },
  {
    "link": "/about",
    "name": "Contact",
    "icon": <AiOutlineMessage />
  },
]

type InputsLogin = {
  pseudo: string,
  password: string,
};

type InputsSignUp = {
  email: string,
  pseudoSignup: string,
  passwordSignup: string,
  verifpasswordsignup: string,
};

export default function Navigation() {
  const [isConnected, setIsConnected] = useState(false)
  const [clickedMenu, setClickedMenu] = useState(false)
  const [activeMenu, setActiveMenu] = useState([false, false, false, false, false])
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure()
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure()
  const initialRef = useRef(null)
  const [sticky, setSticky] = useState("");
  const [show, setShow] = useState(false)

  const toast = useToast()

  const router = useRouter()

  // react hooks form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsLogin>();
  const { register: registerSignup, handleSubmit: handleSubmitSignup, watch: watchSignup } = useForm<InputsSignUp>();


  const onSubmit: SubmitHandler<InputsLogin> = data => connexion(data, window.location.pathname, setIsConnected, onCloseLogin, toast);
  const onSubmitSignup: SubmitHandler<InputsSignUp> = data => inscription(data, window.location.pathname, setIsConnected, onCloseSignup, toast);


  useEffect(() => {
    const localpath = window.location.pathname
    for (let i = 0; i < MENUCONST.length; i++) {
      if (MENUCONST[i].link === localpath) {
        handleNav(i)
      }

    }

    if (Cookies.get('accessToken')) {
      setIsConnected(true)
    }

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [])

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 10 ? styles.is_sticky : "";
    setSticky(stickyClass);

  };

  const handleClick = () => {
    setClickedMenu(!clickedMenu)
    console.log(window.location.pathname)
  }

  const handleNav = (index: number) => {
    let temp_state = [...activeMenu];
    let temp_element = temp_state[index];
    temp_element = true;
    temp_state[index] = temp_element
    setActiveMenu(temp_state)
  }

  const handleShowPwd = () => setShow(!show)

  const deconnexion = () => {

    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setIsConnected(false)
    toast({
      title: 'Déconnexion Réussie !',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <nav className={`${styles.nav} ${sticky}`}>
        <svg id="logo-28" width="161" height="44" viewBox="0 0 161 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M54.196 29H57.715V12.44H54.196V29Z" className="ccustom" fill="#55AE36"></path> <path d="M64.9338 29.368C68.6138 29.368 71.0288 26.999 71.0288 22.813C71.0288 18.765 68.6828 16.235 64.9338 16.235C61.2538 16.235 58.8618 18.604 58.8618 22.813C58.8618 26.884 61.1848 29.368 64.9338 29.368ZM64.9338 26.516C63.3468 26.516 62.4728 25.205 62.4728 22.813C62.4728 20.398 63.3238 19.087 64.9338 19.087C66.5438 19.087 67.4178 20.421 67.4178 22.813C67.4178 25.228 66.5668 26.516 64.9338 26.516Z" className="ccustom" fill="#55AE36"></path> <path d="M76.7538 29.023C78.0878 29.023 79.1918 28.471 79.9738 27.39V29.46C79.9738 31.185 79.1228 31.76 77.8578 31.76C76.6388 31.76 75.6958 31.162 75.5578 30.058H72.0388C72.4758 33.071 74.7528 34.451 77.9038 34.451C81.1468 34.451 83.4928 32.726 83.4928 29.414V16.626H79.9738V17.776C79.2148 16.764 78.1338 16.235 76.7538 16.235C73.6718 16.235 71.6708 18.535 71.6708 22.652C71.6708 26.585 73.6258 29.023 76.7538 29.023ZM77.6048 26.171C76.0868 26.171 75.2818 24.906 75.2818 22.652C75.2818 20.329 76.0868 19.087 77.6048 19.087C79.1458 19.087 79.9738 20.352 79.9738 22.629C79.9738 24.929 79.1688 26.171 77.6048 26.171Z" className="ccustom" fill="#55AE36"></path> <path d="M90.7315 29.368C94.4115 29.368 96.8265 26.999 96.8265 22.813C96.8265 18.765 94.4805 16.235 90.7315 16.235C87.0515 16.235 84.6595 18.604 84.6595 22.813C84.6595 26.884 86.9825 29.368 90.7315 29.368ZM90.7315 26.516C89.1445 26.516 88.2705 25.205 88.2705 22.813C88.2705 20.398 89.1215 19.087 90.7315 19.087C92.3415 19.087 93.2155 20.421 93.2155 22.813C93.2155 25.228 92.3645 26.516 90.7315 26.516Z" className="ccustom" fill="#55AE36"></path> <path d="M97.9976 15.384H101.517V12.44H97.9976V15.384ZM97.9976 29H101.517V16.626H97.9976V29Z" className="ccustom" fill="#55AE36"></path> <path d="M106.711 34.083V27.758C107.447 28.816 108.505 29.368 109.816 29.368C112.967 29.368 115.014 26.999 115.014 22.79C115.014 18.742 113.013 16.235 109.816 16.235C108.528 16.235 107.47 16.833 106.711 17.914V16.626H103.192V34.083H106.711ZM109.08 19.087C110.575 19.087 111.403 20.398 111.403 22.79C111.403 25.205 110.598 26.516 109.08 26.516C107.539 26.516 106.711 25.182 106.711 22.79C106.711 20.398 107.516 19.087 109.08 19.087Z" className="ccustom" fill="#55AE36"></path> <path d="M119.24 20.053C119.24 19.386 119.838 18.926 120.758 18.926C122 18.926 122.736 19.455 122.943 20.72H126.439C126.094 17.592 123.84 16.235 120.873 16.235C117.561 16.235 115.882 18.167 115.882 20.237C115.882 25.205 123.38 23.066 123.38 25.458C123.38 26.217 122.759 26.7 121.517 26.7C120.206 26.7 119.263 26.079 119.102 24.929H115.583C116.043 27.988 118.297 29.368 121.425 29.368C124.645 29.368 126.899 27.689 126.899 25.251C126.899 20.352 119.24 22.491 119.24 20.053Z" className="ccustom" fill="#55AE36"></path> <path d="M135.569 23.733C135.569 25.32 134.695 26.516 133.338 26.516C132.096 26.516 131.498 25.734 131.498 24.147V16.626H127.979V24.86C127.979 27.942 129.704 29.368 132.05 29.368C133.545 29.368 134.764 28.724 135.569 27.344V29H139.088V16.626H135.569V23.733Z" className="ccustom" fill="#55AE36"></path> <path d="M140.788 29H144.307V21.893C144.307 20.306 145.112 19.087 146.331 19.087C147.458 19.087 148.01 19.892 148.01 21.456V29H151.506V21.893C151.506 20.306 152.334 19.087 153.553 19.087C154.68 19.087 155.209 19.892 155.209 21.456V29H158.728V20.743C158.728 17.684 157.026 16.235 154.726 16.235C153.185 16.235 151.874 16.879 151.023 18.282C150.402 16.902 149.16 16.235 147.688 16.235C146.262 16.235 145.089 16.856 144.307 18.19V16.626H140.788V29Z" className="ccustom" fill="#55AE36"></path> <path d="M40.8504 34.0526C44.6624 30.6486 47 26.0548 47 21C47 10.5066 36.9264 2 24.5 2C12.0736 2 2 10.5066 2 21C2 31.4934 12.0736 40 24.5 40C28.0253 40 31.3613 39.3154 34.3316 38.0949C37.8208 40.2486 42.0957 41.7967 46.8169 41.4702C44.3227 40.8362 42.1773 38.2679 40.8504 34.0526Z" className="ccompli2" fill="#B6EFA2"></path> <path d="M41 21C41 28.732 33.6127 35 24.5 35C15.3873 35 8 28.732 8 21C8 13.268 15.3873 7 24.5 7C33.6127 7 41 13.268 41 21Z" className="ccompli1" fill="#88E169"></path> <path d="M35 21C35 25.9706 30.299 30 24.5 30C18.701 30 14 25.9706 14 21C14 16.0294 18.701 12 24.5 12C30.299 12 35 16.0294 35 21Z" className="ccustom" fill="#55AE36"></path> </svg>
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0 }}>
          <ul className={clickedMenu ? `${styles.navbar} ${styles.active}` : styles.navbar}>
            {MENUCONST.map((menu, index) => (
              <li key={menu.name} ><a className={activeMenu[index] ? styles.active : ""} href={menu.link}>
                <div className={styles.link__flex}>
                  <div>
                    {menu.icon}
                  </div>
                  <div>
                    {menu.name}
                  </div>
                </div>
              </a>
              </li>
            ))}
            <li>
              <div className={stylesButton.loginContainer}>
                {!isConnected ? (
                  <>
                    <button className={`${stylesButton.button} ${stylesButton.dark}`} onClick={onOpenLogin}> Log in </button>
                    <button className={`${stylesButton.button} ${stylesButton.white}`} onClick={onOpenSignup}> Sign Up </button>
                  </>
                ) : (
                  <div className={styles.connected__container}>
                    <Tooltip label="Paramètres du compte" aria-label='save_tooltip'>
                      <div className={`${styles.connected__settings} ${stylesButton.white}`}><GiSettingsKnobs /></div>
                    </Tooltip>
                    <button className={`${stylesButton.button} ${stylesButton.dark} ${styles.connected__deconnexion}`} onClick={deconnexion}> Deconnexion <GiExitDoor /> </button>
                  </div>
                )
                }
              </div>
            </li>
            {/* <li>
              <Menu>
                <MenuButton className={styles.avatar}>
                  <Avatar size='sm' bg='white.500' icon={<AiOutlineUser fontSize='1.5rem' />} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem icon={<MdOutlineAccountCircle style={{ fontSize: "1.4em" }} />}>My Account </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <div onClick={onOpen}>
                    <MenuItem icon={<IoExitOutline style={{ fontSize: "1.4em" }} />}> Connexion </MenuItem>
                  </div>
                  <MenuItem icon={<IoExitOutline style={{ fontSize: "1.4em" }} />}> Deconnexion </MenuItem>
                </MenuList>
              </Menu>
            </li> */}

            {/* <li><a>Shop</a></li>
            <li><a>Blog</a></li>
            <li><a>About</a></li>
            <li><a>Contact </a></li> */}
          </ul>

        </motion.div>
        <div className={styles.mobile} onClick={handleClick}>
          <FontAwesomeIcon icon={clickedMenu ? faXmark : faBars} className={styles.mobile_el} />
          {/* <FontAwesomeIcon icon={faXmark} /> */}
        </div>
      </nav>

      {/* Sign up Modal */}
      <Modal isOpen={isOpenSignup} onClose={onCloseSignup} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
            <ModalHeader className={stylesModal.header}>Créer un compte</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' {...registerSignup("email", { required: true })} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Pseudo</FormLabel>
                <Input type='text' {...registerSignup("pseudoSignup", { required: true })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...registerSignup("passwordSignup", { required: true })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPwd}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm your password</FormLabel>
                <Input type='password' {...registerSignup("verifpasswordsignup", { required: true })} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} type='submit'>
                Créer mon compte
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onCloseSignup}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Log in Modal */}
      <Modal isOpen={isOpenLogin} onClose={onCloseLogin} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className={stylesModal.header}>Connexion</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>

              <FormControl isRequired>
                <FormLabel>Pseudo</FormLabel>
                <Input type='text' placeholder='Enter pseudo' {...register("pseudo", { required: true })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...register("password", { required: true })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPwd}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>

              {/*<button className={`${stylesButton.button} ${stylesButton.white}`} style={{marginRight: 3}} onClick={onCloseLogin}> Quitter </button>*/}
              <Button className={`${stylesButton.button}`} colorScheme='darkButton' mr={3} type="submit"> Connexion </Button>
              <Button className={`${stylesButton.button} ${stylesButton.white}`} mr={3} onClick={onCloseLogin}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

    </>
  )
}