from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.views.decorators.http import require_POST

# Create your views here.
def home(request):
    return render(request, 'home.html')


@require_POST
def contact_view(request):
    name = request.POST.get('name', '').strip()
    email = request.POST.get('email', '').strip()
    message = request.POST.get('message', '').strip()

    if not all([name, email, message]):
        return JsonResponse({'status': 'error', 'message': 'All fields are required.'}, status=400)

    try:
        send_mail(
            subject=f'Portfolio Contact: {name}',
            message=f'From: {name} <{email}>\n\n{message}',
            from_email=None,  # uses DEFAULT_FROM_EMAIL
            recipient_list=['jawdjr@gmail.com'],
        )
        return JsonResponse({'status': 'ok', 'message': 'Message sent successfully.'})
    except Exception:
        return JsonResponse({'status': 'error', 'message': 'Failed to send message.'}, status=500)