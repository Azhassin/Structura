import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, Mail, Users, LogOut, Plus, Trash2, 
  Eye, Check, X, Edit, Sparkles, ChevronRight, RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    features: '',
    demo_url: ''
  });

  const getToken = () => localStorage.getItem('token');

  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || !getToken()) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    if (!userData.is_admin) {
      navigate('/');
      return;
    }
    
    setUser(userData);
    fetchDashboard();
  }, [navigate]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/admin/dashboard`, authHeaders());
      setStats(response.data.stats);
      setSubmissions(response.data.recent_submissions || []);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/admin/submissions`, authHeaders());
      setSubmissions(response.data.submissions || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/portfolio`);
      setPortfolio(response.data || []);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') fetchDashboard();
    if (tab === 'submissions') fetchSubmissions();
    if (tab === 'portfolio') fetchPortfolio();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API}/admin/submissions/${id}/read`, {}, authHeaders());
      fetchSubmissions();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    try {
      await axios.delete(`${API}/admin/submissions/${id}`, authHeaders());
      fetchSubmissions();
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        description: project.description,
        category: project.category,
        image: project.image,
        features: project.features?.join(', ') || '',
        demo_url: project.demo_url || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        category: '',
        image: '',
        features: '',
        demo_url: ''
      });
    }
    setShowProjectModal(true);
  };

  const saveProject = async () => {
    try {
      const payload = {
        ...projectForm,
        features: projectForm.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (editingProject) {
        await axios.put(`${API}/portfolio/${editingProject.id}`, payload, authHeaders());
      } else {
        await axios.post(`${API}/portfolio`, payload, authHeaders());
      }
      
      setShowProjectModal(false);
      fetchPortfolio();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project: ' + (err.response?.data?.detail || err.message));
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API}/portfolio/${id}`, authHeaders());
      fetchPortfolio();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50" data-testid="admin-page">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-teal-900 text-white p-6 z-50">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg">Structura</span>
            <span className="block text-xs text-teal-300">Admin Panel</span>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'portfolio', icon: FolderOpen, label: 'Portfolio' },
            { id: 'submissions', icon: Mail, label: 'Submissions' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-4 p-3 bg-white/10 rounded-xl">
            <p className="text-sm text-gray-300">Logged in as</p>
            <p className="font-semibold truncate">{user?.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Portfolio Projects', value: stats?.portfolio_projects || 0, color: 'from-blue-500 to-blue-600' },
                { label: 'Total Submissions', value: stats?.total_submissions || 0, color: 'from-teal-500 to-teal-600' },
                { label: 'Unread Messages', value: stats?.unread_submissions || 0, color: 'from-orange-500 to-orange-600' },
                { label: 'Chat Sessions', value: stats?.chat_sessions || 0, color: 'from-purple-500 to-purple-600' },
              ].map((stat, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur border-0 shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No submissions yet</p>
                ) : (
                  <div className="space-y-3">
                    {submissions.slice(0, 5).map((sub, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold">{sub.name}</p>
                          <p className="text-sm text-gray-500">{sub.subject}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Portfolio Projects
              </h1>
              <Button
                onClick={() => openProjectModal()}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur border-0 shadow-lg overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-teal-100 relative">
                    {project.image && (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    )}
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-teal-500">
                      {project.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openProjectModal(project)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {portfolio.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No projects yet. Add your first project!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Contact Submissions
            </h1>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <Card key={sub.id} className={`bg-white/80 backdrop-blur border-0 shadow-lg ${!sub.is_read ? 'border-l-4 border-l-teal-500' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{sub.name}</h3>
                          {!sub.is_read && <Badge className="bg-teal-500">New</Badge>}
                        </div>
                        <p className="text-gray-500 text-sm mb-1">{sub.email}</p>
                        <p className="font-medium text-teal-600 mb-3">{sub.subject}</p>
                        <p className="text-gray-700">{sub.message}</p>
                        <p className="text-xs text-gray-400 mt-3">
                          {new Date(sub.submitted_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!sub.is_read && (
                          <Button size="sm" variant="outline" onClick={() => markAsRead(sub.id)}>
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteSubmission(sub.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {submissions.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No submissions yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  placeholder="Project title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    placeholder="E-commerce, Portfolio, etc."
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <Label>Features (comma-separated)</Label>
                <Input
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              <div>
                <Label>Demo URL (optional)</Label>
                <Input
                  value={projectForm.demo_url}
                  onChange={(e) => setProjectForm({...projectForm, demo_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={saveProject} className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
                <Button variant="outline" onClick={() => setShowProjectModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
