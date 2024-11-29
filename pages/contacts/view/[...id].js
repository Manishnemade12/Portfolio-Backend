import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";
import { FaPhoneAlt, FaEnvelope, FaProjectDiagram, FaRegFileAlt } from "react-icons/fa";

export default function Contactview() {
    const { alldata, loading } = useFetchData('/api/contacts'); // Fetching all contacts data

    if (loading) {
        return <Dataloading />;
    }

    return (
        <div className="contact-details-container">
            <div className="contact-header">
                <h1>Contact Details</h1>
                <p>Here you can view the details for all the contacts</p>
            </div>

            <div className="contacts-list">
                {alldata && alldata.length > 0 ? (
                    alldata.map((contact) => (
                        <div key={contact._id} className="contact-card">
                            <div className="contact-card-header">
                                <h2>{contact.name}</h2>
                            </div>
                            <div className="contact-card-body">
                                <div className="contact-info">
                                    <div className="info-item">
                                        <FaEnvelope className="icon" />
                                        <span><strong>Email:</strong> {contact.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <FaPhoneAlt className="icon" />
                                        <span><strong>Phone:</strong> {contact.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <FaProjectDiagram className="icon" />
                                        <span><strong>Project:</strong> {contact.project[0]}</span>
                                    </div>
                                    <div className="info-item">
                                        <FaRegFileAlt className="icon" />
                                        <span><strong>Description:</strong> {contact.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No contacts available.</p>
                )}
            </div>
        </div>
    );
}
