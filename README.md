# TactiCore

**Understand the Game. Master the Tactics.**

A responsive football-learning website built with HTML, CSS, and vanilla JavaScript. It is designed to work as a static website on GitHub Pages.

## Included features

- Responsive navigation and football-inspired visual design
- Learning modules for fundamentals, positions, tactics, passing, training, and history
- Formation library: 4-3-3, 4-2-3-1, and 4-1-2-1-2 narrow
- Interactive formation board: select a player, tap a new spot, double-click to rename
- Save/load/delete custom formations in the current browser
- Educational player comparison cards
- Five-question football quiz with saved best score
- Personal dashboard, data export, and local progress saving
- Meet the Creator page for Gaurang Rathore
- Login dialog that clearly explains cloud login is not connected yet

## Run it locally

Open `index.html` in a modern browser. For local development, you can also use VS Code's Live Server extension.

## Publish with GitHub Pages

1. Create/open your GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. In repository Settings → Pages, choose the branch and root folder if required.
4. Wait for GitHub Pages to publish, then open the URL it shows.

## Data and privacy

This starter version saves lessons, quiz best score, and custom formations in the browser's `localStorage`. This is local to that browser/device and can be cleared if browser data is deleted. It does **not** currently sync across devices.

The Sign in button is currently an informational placeholder. Real Google sign-in and cloud sync need a backend provider (for example, Supabase or Firebase), provider setup, allowed redirect URLs, and carefully configured database access rules. Do not put private service-role keys in frontend JavaScript. Public client configuration is not a substitute for database security rules.

## Important content note

Player comparison ratings are illustrative demo values, not official statistics. Update the site with verified sources if you want current records, match data, or season statistics. TactiCore is an independent educational project, not affiliated with FIFA, any club, or any player.
