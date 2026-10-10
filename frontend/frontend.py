import streamlit as st
import requests

# Page Title
st.title("🚗 AutoMartX - Available Cars")

# FastAPI Backend URL
API_URL = "http://127.0.0.1:8000/vehicles/"

try:
    # Backend API-la irunthu data vaangurom
    response = requests.get(API_URL)
    
    if response.status_code == 200:
        cars = response.json()
        
        if not cars:
            st.warning("Ippo entha cars-um kidaikkala.")
        else:
            # Ovvoru car-kkum UI create pandrom
            for car in cars:
                st.subheader(f"{car['brand']} {car['model']}")
                st.write(f"**Status:** {car['status']}")
                st.write(f"**Price:** ₹ {car['price']}")
                
                # Joins work aagutha nu paakka Seller details
                if "seller" in car and car["seller"]:
                    st.write(f"**Seller:** {car['seller']['name']}")
                
                st.divider() # Oru line poduthu
    else:
        st.error("Backend-la irunthu data varala!")
        
except Exception as e:
    st.error(f"FastAPI Server run aagalaiyo? Error: {e}")