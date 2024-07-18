import React, { useState } from 'react'
import { isMobile } from 'mobile-device-detect'
import Modal from '@mui/material/Modal'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import { Button, Typography, Stack, MenuItem } from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'
import { useWallets, useWallet } from '@wallet-standard/react'
import {
  getAddress,
  sendBtcTransaction,
  signMessage,
  AddressPurpose,
  BitcoinNetworkType,
} from 'sats-connect'

const Mstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  bgcolor: 'white',
  borderRadius: '12px',
  boxShadow: 24,
  display: 'flex',
}

const mobileWalletStyle = {
  display: 'flex',
  gap: '40px',
  alignItems: 'start',
  textTransform: 'none',
  color: 'black',
  justifyContent: 'start',
  fontSize: '14px',
  fontWeight: 'bold',
}

function ConnectButton() {
  const [openModal, setOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [ogAddress, setOGAddress] = useState(null)
  const [connected, setConnected] = useState(false)
  const [selectedwallet, setSelectedwallet] = useState('unisat')
  const [anchorEl, setAnchorEl] = useState(null)
  const [ogData, setOGData] = useState();
  const [data, setData] = useState();


  const open = Boolean(anchorEl)

  const handleOpen = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { wallets } = useWallets()
  const { setWallet } = useWallet()

  console.log(wallets)
  const handleClick = (event) => {
    if (connected) {
      setAnchorEl(event.currentTarget)
    } else {
      handleOpen()
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SatsConnectNamespace = 'sats-connect:'

  function isSatsConnectCompatibleWallet(wallet) {
    return SatsConnectNamespace in wallet.features
  }

  const filteredwallets = wallets.filter(isSatsConnectCompatibleWallet)
  const magicedenWallet = filteredwallets.filter(
    (wallet) => wallet.name == 'Magic Eden'
  )

  const getBasicInfo = async () => {
    const unisat = window.unisat
    const [address] = await unisat.getAccounts()
    setWalletAddress(address)
    setOGAddress(address)
  }

  const handleAccountsChanged = (_accounts) => {
    // const accounts = _accounts;
    if (_accounts.length > 0) {
      setConnected(true)
      getBasicInfo()
    } else {
      setConnected(false)
    }
  }

  const DisconnectWallet = () => {
    setOGData();
    setData();
    setConnected(false);
    handleClose();
    setWalletAddress(null);
    setOGAddress(null);
  };

  const ConnectWallet = async () => {
    if (!window.unisat) return toast.error('Unisat wallet is not installed.')
    try {
      let result = await window.unisat.requestAccounts()
      handleAccountsChanged(result)
      setConnected(true)
      setOpen(false)
      setSelectedwallet('unisat')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const XverseWalletConnect = async () => {
    try {
      const getAddressOptions = {
        payload: {
          purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
          message: 'Address for receiving payments',
          network: {
            type: BitcoinNetworkType.Mainnet,
          },
        },
        onFinish: (response) => {
          setWalletAddress(response.addresses[0].address)
          setOGAddress(response.addresses[1].address)
          setConnected(true)
          setOpen(false)
          setSelectedwallet('xverse')
        },
        onCancel: () => toast.error('Request canceled'),
      }

      await getAddress(getAddressOptions)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const OkxWalletConnect = async () => {
    try {
      if (typeof window.okxwallet === 'undefined') {
        toast.error('OKX is not installed!')
      } else {
        const result = await window.okxwallet.bitcoin.connect()
        setWalletAddress(result.address)
        setOGAddress(result.address)
        setConnected(true)
        setOpen(false)
        setSelectedwallet('okx')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const LeatherWalletConnect = async () => {
    try {
      if (typeof window.okxwallet === 'undefined') {
        toast.error('Leather is not installed!')
      } else {
        const userAddresses = await window.btc?.request('getAddresses')

        if (
          !userAddresses ||
          !userAddresses.result ||
          !userAddresses.result.addresses
        ) {
          toast.error('Failed to retrieve addresses')
          return
        }

        const usersNativeSegwitAddress = userAddresses.result.addresses.find(
          (address) => address.type === 'p2wpkh'
        )
        const usersOGAddress = userAddresses.result.addresses.find(
          (address) => address.type === 'p2tr'
        )

        if (usersNativeSegwitAddress && usersOGAddress) {
          setWalletAddress(usersNativeSegwitAddress.address)
          setOGAddress(usersOGAddress.address)
          setConnected(true)
          setOpen(false)
          setSelectedwallet('leather')
        } else {
          toast.error('Addresses not found')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const MagicEdenWalletConnect = async () => {
    if (magicedenWallet.length > 0 && magicedenWallet[0]) {
      try {
        await getAddress({
          getProvider: async () => {
            const provider =
              magicedenWallet[0].features[SatsConnectNamespace]?.provider
            if (!provider) {
              throw new Error('Provider not found')
            }
            return provider
          },
          payload: {
            purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
            message: 'Address for receiving Ordinals and payments',
            network: {
              type: BitcoinNetworkType.Mainnet,
            },
          },
          onFinish: (response) => {
            setWallet(magicedenWallet[0])
            setWalletAddress(response.addresses[0].address)
            setOGAddress(response.addresses[1].address)
            setConnected(true)
            setOpen(false)
            setSelectedwallet('magiceden')
          },
          onCancel: () => {
            toast.error('Request canceled')
          },
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      toast.error('Please install wallet')
    }
  }

  return (
    <div>
      {!connected ? (
        <div className='button-group'>
          <button
            data-augmented-ui='tl-clip br-clip border inlay'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            className='claim connector'
            onClick={handleClick}
          >
            {isMobile ? 'Connect' : 'connect'}
          </button>
        </div>
      ) : (
        <div className='button-group'>
          <button
            data-augmented-ui='tl-clip br-clip border inlay'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            className='claim connector'
            variant='contained'
          >
            {walletAddress &&
              walletAddress.slice(0, 6) +
                '...' +
                walletAddress.slice(
                  walletAddress.length - 4,
                  walletAddress.length
                )}
          </button>
        </div>
      )}
      <Menu
        id='basic-menu'
        sx={{
          zIndex: 99999999,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            zIndex: 9999999999,
            position: 'fixed',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.2,
            borderRadius: '5px',
            border: 'solid 1px black',
            background: '#949494',
            paddingX: '5px',
            '& ul': {
              padding: '0px !important',
              backgroundColor: '#949494',
              borderRadius: '11px',
            },
            '& .MuiAvatar-root': {
              width: 65,
              height: 32,
              ml: 0,
              mr: 1,
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '15px', fontWeight: 'bold' }}
        >
          {walletAddress ? (
            walletAddress.slice(0, 6) +
            '...' +
            walletAddress.slice(walletAddress.length - 4, walletAddress.length)
          ) : (
            <></>
          )}
        </MenuItem>
        <MenuItem
          onClick={DisconnectWallet}
          sx={{ fontSize: '15px', fontWeight: 'bold' }}
        >
          Disconnect
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {isMobile ? (
          <Box sx={Mstyle}>
            <Stack
              sx={{
                flex: '1',
                bgcolor: '#d3d3d3',
                borderRadius: '12px',
                px: 5,
                py: 4,
              }}
            >
              <Button sx={mobileWalletStyle} onClick={ConnectWallet}>
                <img
                  src={'/assets/wallet/unisat.jpg'}
                  alt=''
                  width={30}
                  height={30}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                <Box>Unisat Wallet</Box>
              </Button>

              <Button onClick={XverseWalletConnect} sx={mobileWalletStyle}>
                <img
                  src={'/assets/wallet/xverse.jpg'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                <Box>Xverse Wallet</Box>
              </Button>

              <Button onClick={OkxWalletConnect} sx={mobileWalletStyle}>
                <img
                  src={'/assets/wallet/okx.png'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                <Box>Okx Wallet</Box>
              </Button>

              <Button onClick={LeatherWalletConnect} sx={mobileWalletStyle}>
                <img
                  src={'/assets/wallet/leather.jpg'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                <Box>Leather Wallet</Box>
              </Button>
              <Button onClick={MagicEdenWalletConnect} sx={mobileWalletStyle}>
                <img
                  src={'/assets/wallet/magiceden.png'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                <Box>magiceden Wallet</Box>
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={Mstyle}>
            <Stack
              sx={{
                flex: '1',
                bgcolor: '#d3d3d3',
                borderRadius: '12px',
                p: 4,
              }}
            >
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                mb={5}
              >
                Connect a Wallet
              </Typography>
              <Button
                sx={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: 'black',
                  justifyContent: 'flex-start',
                }}
                onClick={ConnectWallet}
              >
                <img
                  src={'/assets/wallet/unisat.jpg'}
                  width={30}
                  height={30}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                Unisat Wallet
              </Button>
              <Button
                onClick={XverseWalletConnect}
                sx={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: 'black',
                  justifyContent: 'flex-start',
                }}
              >
                <img
                  alt=''
                  src={'/assets/wallet/xverse.jpg'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                Xverse Wallet
              </Button>
              <Button
                onClick={OkxWalletConnect}
                sx={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: 'black',
                  justifyContent: 'flex-start',
                }}
              >
                <img
                  alt=''
                  src={'/assets/wallet/okx.png'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                Okx Wallet
              </Button>
              <Button
                onClick={LeatherWalletConnect}
                sx={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: 'black',
                  justifyContent: 'flex-start',
                }}
              >
                <img
                  src={'/assets/wallet/leather.jpg'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                Leather Wallet
              </Button>
              <Button
                onClick={MagicEdenWalletConnect}
                sx={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: 'black',
                  justifyContent: 'flex-start',
                }}
              >
                <img
                  src={'/assets/wallet/magiceden.png'}
                  alt=''
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                  }}
                />{' '}
                Magiceden Wallet
              </Button>
            </Stack>
          </Box>
        )}
      </Modal>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: 'black',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  )
}

export default ConnectButton
