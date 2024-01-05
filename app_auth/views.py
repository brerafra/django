from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import User
from .forms import LoginForm,SignupForm, UserCreationForm

def index(request):
    users = User.objects.all().order_by('-id')
    return render(request, 'index.html', {'users':users})

def user_sessions(request):
    users = User.objects.all().order_by('-id')

    return render(request, 'sessions.html', {'users':users})

def user_signup(request):
    if request.method=='POST':
        form0_ = UserCreationForm(request.POST)
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form =SignupForm()
    return render(request, 'signup.html',{'form':form})

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('home')
            
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form':form})
    
def user_logout(request):
    logout(request)
    return redirect('login')