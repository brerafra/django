from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import password_validation
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator

username_validator = UnicodeUsernameValidator()


class SignupForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, min_length=4, required=True, help_text='Required: First Name',
                                widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=30, min_length=4, required=True, help_text='Required: Last Name',
                               widget=(forms.TextInput(attrs={'class': 'form-control'})))
    email = forms.EmailField(max_length=50, help_text='Required. Inform a valid email address.',
                             widget=(forms.TextInput(attrs={'class': 'form-control'})))
    password1=forms.CharField(label=_('Password'),
                                widget=(forms.PasswordInput(attrs={'class': 'form-control'})),
                                help_text=password_validation.password_validators_help_text_html())
    password2=forms.CharField(label=_('Confirmación de Contraseña'), widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    username = forms.CharField(
        label=_('Usuario'),
        max_length=150,
        help_text=_('Requerido. 150 caracteres o menos. Letras, digitos y @/./+/-/_.'),
        validators=[username_validator],
        error_messages={'unique': _("Ya existe este usuario.")},
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2',)

class LoginForm(forms.Form):
    username = forms.CharField(
        label=_('Usuario'),
        validators=[username_validator],
        error_messages={'unique': _("Ya existe este usuario.")},
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    password = forms.CharField(label=_('Constraseña'),
                                widget=(forms.PasswordInput(attrs={'class': 'form-control'})))