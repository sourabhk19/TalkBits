import random
from django.conf import settings
from django.http import HttpResponse, Http404,JsonResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from .serializers import TweetSerializer
from rest_framework.response import Response 
from rest_framework.decorators import api_view


# Create your views here.
ALLOWED_HOSTS=settings.ALLOWED_HOSTS
def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1>Hello World</h1>")
    return render(request,"pages/home.html",context={})

@api_view(['GET'])
def tweet_detail_view( request,tweet_id, *args, **kwargs):
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({},status=404)
    obj=qs.first()
    serializer=TweetSerializer(obj)
    return Response(serializer.data,status=200)

@api_view(['GET'])
def tweet_list_view( request, *args, **kwargs):
    qs=Tweet.objects.all()
    serializer=TweetSerializer(qs,many=True)
   
    return Response(serializer.data)

def tweet_list_view_pure_django( request, *args, **kwargs):
    qs=Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs]
    data={
        "response":tweets_list,
        "isuser":False
    }
    return JsonResponse(data)

@api_view(['POST'])
def tweet_create_view(request,*args,**kwargs):
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data,status=201)
    return Response({}, status=400)



def tweet_create_view_pure_django(request,*args,**kwargs):
    #print ("ajax",request.is_ajax())
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form=TweetForm(request.POST or None)
    next_url=request.POST.get("next") or None
    if form.is_valid():
        obj=form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 == created items
        if next_url!=None and is_safe_url(next_url,ALLOWED_HOSTS):
            return redirect(next_url)
        form=TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors,status=400)
    return render(request,"components/forms.html",context={'form':form})

def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST view
    """
    data={
        "id":tweet_id
        }
    status=200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content']=obj.content
    except:
        data['message']="Not found unfortunately"
        status=404
    return JsonResponse(data,status=status)
    #return HttpResponse(f"<h1>Hello {tweet_id} - {obj.content}</h1>")