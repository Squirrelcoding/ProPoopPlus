/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import Link from 'next/link'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
const Header = ({ amountOfAnnouncements, announcementTimestamps }) => {
  const url = "http://localhost:3000";
  const { user, mutateUser } = useUser();
  const router = useRouter();

  function checkIfSameDay() {
    var iterator = 0;
    for (var i of announcementTimestamps) {
      iterator++;
      if (new Date().toDateString() === new Date(Number(i)).toDateString()) {
        return true;
      } if (iterator == announcementTimestamps.length) {
        return false;
      }
    }
  };
  return (
    <header>
      <nav>
        <ul>
          {/* SVG doesnt work so Im going with PNG. */}
          <li className="left"><a href="/">
           <img src="https://i.imgur.com/m9yKUMd.png" width="30px" height="30px"/>
          </a></li>
          {!user?.isLoggedIn && (
            <li className="left">
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>            
          )}
          {!user?.isLoggedIn && (
            <li className="left">
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </li>            
          )}
          {user?.isLoggedIn && (
            <>
              <li className="left">
              <Link href="/feed">
                <a>Community Posts & blog</a>
              </Link>
              </li>
              <li className="left">
              <Link href="/videos">
                <a>Videos</a>
              </Link>
              </li>
              <li className="left">
              <a>Announcements</a>
              </li>
              <li className="left">
                {checkIfSameDay() && 
                 <Badge badgeContent={amountOfAnnouncements} color="error">
                  <Link href="/announcements">
                   <a>Announcements</a>
                 </Link>
               </Badge>
                }
              </li>
              <li className="left">
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
              <li className="right">
                 <Button style={{textTransform:"none"}} variant="contained" href="https://github.com/Squirrelcoding/ProPoopPlus/issues">&beta;</Button>
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
        li.left {
          margin-left: 1rem;
          display: flex;
        }
        li.right {
          margin-right: 1rem;
          display: flex;
        } 
        li.left:first-child {
          margin-left: -20px;
        }
        li.right {
          margin-left: auto;
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