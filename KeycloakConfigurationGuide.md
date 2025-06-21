# 🔐 Keycloak Setup Guide

This guide will walk you through setting up **Keycloak** for the full-stack Post application.

## ✅ Prerequisites

- Keycloak running at [http://localhost:8080](http://localhost:8080)
- Default admin credentials: `admin / admin` (or your own)

---

## 🛠 Step-by-Step Setup

### 1. Log in to Keycloak Admin Console
- Open [http://localhost:8080](http://localhost:8080) in your browser.
- Login with your credentials (e.g., `admin` / `admin`).

### 2. Create a Realm
- Click the **Realm selector** (top-left dropdown).
- Click **Create Realm**.
- Set `Name` to: **posts-realm**
- Click **Next**
- Under `Valid Redirect URIs`, enter: `http://localhost:3000/*`
- Under `Web origins`, enter: `*`
*(Or use `http://localhost:3000` for more restrictive security)*
- Click **Save**.

### 4. Create a Role
- Go to the **Roles** tab (left sidebar).
- Click **Add Role**.
- Set `Role name` to: `ADMIN`
- Click **save**.

### 5. Create a User
- Go to the **Users** tab (left sidebar).
- Click **Create User**.
- Fill in basic details like:
- Username
- Email (optional)
- First name / Last name
- Click **Create**.

### 6. Set User Password
- After creating the user, go to the **Credentials** tab.
- Click **Set Password**.
- Enter the password (e.g., `password`).
- Toggle **Temporary** to `OFF`.
- Click **Save**.

### 7. Assign Role to User
- Go to the **Role Mappings** tab.
- In the **Available Roles** list, find and select `ADMIN`.
- Click **Add selected**.

---

## ✅ Done!

Your Keycloak is now ready:
- Realm: `posts-realm`
- Client: `post-client`
- Role: `ADMIN`
- User: with assigned role and password

You can now use this configuration in your frontend (Keycloak JS adapter) and backend (`issuer-uri`).

> Make sure to update `application-docker.yaml` and frontend config with your Keycloak URLs and realm/client info.
