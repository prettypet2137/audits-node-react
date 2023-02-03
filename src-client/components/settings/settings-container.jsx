import React, { useState, useEffect, useRef } from 'react';

import API from '../../api/api';

const useFetch = (url) => {
  const [settings, setSettings] = useState({});
  const isLoaded = useRef(false);

  const fetchSettings = async () => {
    console.log('Fetching settings');
    const response = await API.get(url);
    /* eslint-disable no-debugger */
    // debugger;
    const { data } = response;
    /* eslint-disable camelcase */
    const dailyEmailUpdates = data[0].daily_email_updates;
    setSettings({ daily_email_updates: dailyEmailUpdates });
    isLoaded.current = true;
  };

  const updateSettings = async () => {
    if (isLoaded.current) {
      console.log('Updating settings: ', settings);
      await API.put(`${url}/daily_email_updates`, {
        value: settings.daily_email_updates,
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    updateSettings();
  }, [settings]);

  return { settings, setSettings };
};

export default function SettingsContainer() {
  const { settings, setSettings } = useFetch('/api/settings');

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item"><a href="http://example.com">User</a></li>
          <li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
        </ol>
      </nav>

      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="card">
            <div className="card-body">
              <nav className="nav flex-column nav-pills nav-gap-y-1">
                <a href="#profile" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">
                  Profile Information
                </a>
                <a href="#billing" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                  Billing
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body tab-content">
              <div className="tab-pane active" id="profile">
                <h6>YOUR PROFILE INFORMATION</h6>
                <form>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      aria-describedby="fullNameHelp"
                      placeholder="Enter your full name"
                    />
                    <small id="fullNameHelp" className="form-text text-muted">Your name may appear around here where you are mentioned. You can change or remove it at any time.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter your location" />
                  </div>
                  <div className="form-group small text-muted">
                    All of the fields on this page are optional and can be deleted at any time,
                    and by filling them out, you&apos;re giving us consent to share this data
                    wherever your user profile appears.
                  </div>
                </form>

                <hr />
                <div className="mt-3">
                  <h6>NOTIFICATION SETTINGS</h6>
                  <form>
                    <div className="form-group mb-0">
                      <ul className="list-group list-group-sm">
                        <li className="list-group-item has-icon">
                          Daily email updates
                          <div className="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              checked={!!settings.daily_email_updates}
                              onChange={() => setSettings({
                                daily_email_updates: !settings.daily_email_updates
                              })}
                            />
                            <label className="custom-control-label" htmlFor="customSwitch1" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
