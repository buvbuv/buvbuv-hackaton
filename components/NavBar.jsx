import React, { Component } from 'react';
import Link from 'next/link';
import WalletConnect from './WalletConnect';
import WalletContext from './WalletContext'


class NavBar extends Component
{
    render() {
        return (
        <nav className="flex flex-grow content-center">
            <div className="m-3 flex content-center">
                <span className="p-3 content-center">
                <Link href="/">
                    <a> HOME </a>
                </Link>
                </span>
            </div>

            <div className="m-3 flex flex-grow pl-10">
                <ul className="m-0 flex flex-row">
                <li className="p-3">
                    <Link href="/browse">
                        <a> BROWSE </a>
                    </Link>
                </li>
                <li className="p-3">
                    <Link href="/create">
                        <a> CREATE </a>
                    </Link>
                </li >
                <li className="p-3">
                    <Link href="/trade">
                        <a> TRADE </a>
                    </Link>
                </li>
                <li className="p-3">
                    <Link href="/faq">
                    <a> FAQ </a>
                    </Link>
                </li>
                </ul>
            </div>

            <div className="flex content-center p-3 pr-8">
                <WalletConnect></WalletConnect>
            </div>
        </nav>
        )
    }
}

export default NavBar;