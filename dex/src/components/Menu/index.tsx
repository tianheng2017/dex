import React, { useRef } from 'react'
import { Info, BookOpen } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'

import { ExternalLink } from '../../theme'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 13.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
    const node = useRef<HTMLDivElement>()
    const [open, toggle] = useToggle(false)

    useOnClickOutside(node, open ? toggle : undefined)

    return (
        <StyledMenu ref={node as any}>
            <StyledMenuButton onClick={toggle}>
                <StyledMenuIcon />
            </StyledMenuButton>
            {open && (
                <MenuFlyout>
                    <MenuItem id="link" href="https://testnet.bnbchain.org/faucet-smart">
                        <Info size={14} />
                        BSC测试网水龙头
                    </MenuItem>
                    <MenuItem id="link" href="https://testnet.bscscan.com/">
                        <BookOpen size={14} />
                        测试网区块浏览器
                    </MenuItem>
                    <MenuItem id="link" href="https://learnblockchain.cn/docs/hardhat/guides/scripts.html">
                        <BookOpen size={14} />
                        hardhat中文文档
                    </MenuItem>
                    <MenuItem id="link" href="https://remix.ethereum.org/">
                        <BookOpen size={14} />
                        remix智能合约IDE
                    </MenuItem>
                    <MenuItem id="link" href="https://learnblockchain.cn/docs/solidity/">
                        <BookOpen size={14} />
                        solidity中文文档
                    </MenuItem>
                </MenuFlyout>
            )}
        </StyledMenu>
    )
}
