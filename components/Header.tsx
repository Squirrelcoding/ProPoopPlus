/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import Link from 'next/link'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'

const Header = () => {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  return (
    <header>
      <nav>
        <ul>
          {/* SVG doesnt work. */}
          <li><a href="/">
           <img src="https://i.imgur.com/m9yKUMd.png" width="30px" height="30px"/>
          </a></li>
          {!user?.isLoggedIn && (
            <li>
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>            
          )}
          {!user?.isLoggedIn && (
            <li>
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </li>            
          )}
          {user?.isLoggedIn && (
            <>
              <li>
              <Link href="/feed">
                <a>Community Posts & blog</a>
              </Link>
              </li>
              <li>
              <Link href="/videos">
                <a>Videos</a>
              </Link>
              </li>
              <li>
              <Link href="/announcements">
                <a>Announcements</a>
              </Link>
              </li>
              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(
                      await fetchJson('/api/logout', { method: 'POST' }),
                      false
                    )
                    router.push('/login')
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-right: 0;
          padding-right: 0;
        }
        li {
          margin-left: 1rem;
          display: flex;
        }
        li:first-child {
          margin-left: -20px;
        }
        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        a img {
          margin-left: 10px;
        }
        img:hover {
          cursor: pointer;
        }
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  )
}

export default Header