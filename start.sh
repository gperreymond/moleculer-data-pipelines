#!/bin/bash

./kind create cluster --name infra --config cluster.yaml

kubectl cluster-info --context kind-infra

sleep 2

# nginx
kubectl apply -f cluster/nginx.yaml

echo "waiting for nginx-ingress to setup"
sleep 180
echo "nginx-ingress is ok, continue..."

# argocd
kubectl create namespace argocd
helm dependency update cluster/argocd
helm upgrade -n argocd --install argocd cluster/argocd

echo "waiting for argocd to setup"
sleep 60
echo "argocd is ok, continue..."
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2
