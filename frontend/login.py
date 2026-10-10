import streamlit as st
import requests

# Page configuration
st.set_page_config(page_title="AutoMartX", page_icon="🚗", layout="centered")

API_URL = "http://127.0.0.1:8000/vehicles/"

# Initialize session state for login
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

if not st.session_state.logged_in:
    st.title("🚗 AutoMartX Login")
    
    # Login Form
    email = st.text_input("Email Address 📧")
    password = st.text_input("Password 🔒", type="password")
    
    if st.button("Login", use_container_width=True):
        if email == "admin@gmail.com" and password == "12345":
            st.session_state.logged_in = True
            st.rerun()
        else:
            st.error("Invalid Email or Password. Please try again!")

else:
    # --- Dashboard Header ---
    col1, col2 = st.columns([4, 1])
    with col1:
        st.title("🚗 AutoMartX Dashboard")
    with col2:
        if st.button("Logout", type="primary"):
            st.session_state.logged_in = False
            st.rerun()
    
    st.write("---")
    
    # Create Tabs for viewing and adding cars
    tab1, tab2 = st.tabs(["📋 View Cars", "➕ Add New Car"])
    
    # TAB 1: CARS LIST
    with tab1:
        st.subheader("Available Cars")
        try:
            response = requests.get(API_URL)
            if response.status_code == 200:
                cars = response.json()
                
                if not cars:
                    st.info("No cars available at the moment. Please add a new car!")
                else:
                    for car in cars:
                        st.write(f"**{car['brand']} {car['model']}**")
                        st.write(f"Status: {car['status']} | Price: ₹{car['price']}")
                        
                        if "seller" in car and car["seller"]:
                            st.caption(f"Seller: {car['seller']['name']}")
                            
                        st.divider()
        except Exception as e:
            st.error("Failed to connect to the backend. Please ensure the Uvicorn server is running.")

    # TAB 2: ADD NEW CAR FORM
    with tab2:
        st.subheader("Enter Car Details")
        
        # Form to add a new vehicle
        with st.form("add_car_form"):
            brand = st.text_input("Car Brand (ex: Hyundai, Tata)")
            model = st.text_input("Car Model (ex: i20, Nexon)")
            price = st.number_input("Price (₹)", min_value=10000, value=500000, step=10000)
            status = st.selectbox("Status", ["Available", "Sold", "In Service"])
            
            col1, col2 = st.columns(2)
            with col1:
                seller_id = st.number_input("Seller ID", min_value=1, value=1)
            with col2:
                category_id = st.number_input("Category ID", min_value=1, value=1)
                
            submit_button = st.form_submit_button("Save Car to Database", use_container_width=True)
            
            if submit_button:
                new_car_data = {
                    "seller_id": seller_id,
                    "category_id": category_id,
                    "brand": brand,
                    "model": model,
                    "price": price,
                    "status": status
                }
                
                # Send POST request to backend API
                post_response = requests.post(API_URL, json=new_car_data)
                
                if post_response.status_code == 200:
                    st.success("Success! The car has been added to the database. Check the 'View Cars' tab.")
                else:
                    st.error("Error! Please verify if the Seller ID and Category ID exist in the database.")