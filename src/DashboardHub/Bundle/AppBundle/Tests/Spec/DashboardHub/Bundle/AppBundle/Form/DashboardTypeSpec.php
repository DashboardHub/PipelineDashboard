<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Form;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;
use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class DashboardTypeSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->beConstructedWith(array());
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Form\DashboardType');
    }

    function it_should_get_name()
    {
        $this->beConstructedWith(array());
        $this->getName()->shouldReturn('dashboard');
    }

    function it_should_set_default_options(OptionsResolverInterface $resolver)
    {
        $this->beConstructedWith(array());
        $resolver
            ->setDefaults(
                array(
                    'data_class' => 'DashboardHub\Bundle\AppBundle\Entity\Dashboard'
                )
            )
            ->shouldBeCalled();
        $this->setDefaultOptions($resolver);
    }

    function it_should_build_form(FormBuilderInterface $builder)
    {
        $config =
            array(
                'Github'       => 'DashboardHubAppBundle:Template:Github.html.twig',
                'GithubTravis' => 'DashboardHubAppBundle:Template:GithubTravis.html.twig'
            );

        $this->beConstructedWith($config);
        $builder
            ->add('name', null,
                  array(
                      'attr' => array(
                          'placeholder' => 'The name for your Dashboard',
                      ),
                  )
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->add('repository', null,
                  array(
                      'attr' => array(
                          'placeholder' => 'Dashboardhub/PipelineDashboard (owner/repo)',
                      ),
                  )
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->add(
                'theme',
                'choice',
                array(
                    'choices'  => array_flip($config),
                    'required' => true,
                )
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->add(
                'public',
                'radio',
                array(
                    'data'  => true,
                    'label' => 'Public Dashboard'
                )
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->add(
                'save',
                'submit',
                array('label' => 'Save')
            )
            ->shouldBeCalled()
            ->willReturn($builder);
        $builder
            ->addEventListener(
                FormEvents::POST_SET_DATA,
                array($this, 'onPostSetData')
            )
            ->shouldBeCalled()
            ->willReturn($builder);

        $this->buildForm($builder, array());
    }

    function it_should_on_post_set_data(
        FormEvent $event,
        TokenInterface $token,
        Dashboard $dashboard
    )
    {
        $this->beConstructedWith(array());
        $dashboard->setUpdatedOn(Argument::type('Datetime'))
                  ->shouldBeCalled()
                  ->willReturn($dashboard);

        $event->getData()
              ->shouldBeCalled()
              ->willReturn($dashboard);

        $this->onPostSetData($event);
    }
}
