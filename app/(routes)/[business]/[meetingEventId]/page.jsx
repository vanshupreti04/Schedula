"use client"
import React, { useEffect, useState } from 'react'
import { use } from 'react';  // <-- important
import MeetingTimeDateSelection from '../_components/MeetingTimeDateSelection'
import { collection, doc, doc as docRef, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig';

function SharedMeetingEvent({ params }) {
    const resolvedParams = use(params);  // <-- FIX: resolve the params Promise
    const db = getFirestore(app);
    const [businessInfo, setBusinessInfo] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (resolvedParams) {
            getMeetingBusinessAndEventDetails();
        }
    }, [resolvedParams]);

    const getMeetingBusinessAndEventDetails = async () => {
        setLoading(true);
    
        try {
            // 🚀 Decode business name first
            const businessName = decodeURIComponent(resolvedParams.business);
    
            console.log("Decoded Business Name:", businessName);
    
            const q = query(
              collection(db, 'Business'),
              where('businessName', '==', businessName)
            );
    
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const businessData = querySnapshot.docs[0].data();
                setBusinessInfo(businessData);
            } else {
                console.error('🔥 No business found for name:', businessName);
            }
            
            const meetingDocRef = doc(db, 'MeetingEvent', resolvedParams?.meetingEventId);
            const meetingSnapshot = await getDoc(meetingDocRef);
    
            if (meetingSnapshot.exists()) {
                setEventInfo(meetingSnapshot.data());
            } else {
                console.error('🔥 Meeting Event not found!');
            }
        } catch (error) {
            console.error('🔥 Error fetching data:', error);
        }
    
        setLoading(false);
    };
    

    if (loading || !businessInfo || !eventInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Loading meeting details...</p>
            </div>
        );
    }

    return (
        <div>
            <MeetingTimeDateSelection
                eventInfo={eventInfo}
                businessInfo={businessInfo}
            />
        </div>
    );
}

export default SharedMeetingEvent;
